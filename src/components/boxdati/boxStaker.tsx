import React, {
  useState,
  useContext,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import style from './boxDati.module.scss';
import { RiTerminalFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { ShareContext } from '../../context/context';
import { UserContext } from '../../context/user-context';
import { NodeState } from '../../typings/node';
import Node from '../../typings/node';
import Nodo from './specials/nodo';
import WrapperGraph from './specials/graphs/wrapperGraph';
import { datiLetture } from '../../utils/datiLetture';
import AlertRunning from './specials/alertRunning';
import CommandType from '../../utils/command';
import StoricoSessioni from './specials/storicoSessioni';
import Reading from '../../typings/reading';

type StatoSensoreProps = {
  statoSensore: NodeState;
};

function nomeStatoInScheda(nomeStatoSensore: string) {
  if (
    nomeStatoSensore === 'alert-ready' ||
    nomeStatoSensore === 'alert-running'
  ) {
    return 'alert';
  }
  return nomeStatoSensore;
}

const StatoSensore: FC<StatoSensoreProps> = ({ statoSensore }) => {
  const uiStatiSensore = {
    ok: 'sensore funzionante',
    rec: 'in stato di rilevamento...',
    off: 'sensore non funzionante',
    'alert-ready': 'rilevata anomalia',
    // TODO: messaggio
    'alert-running': 'Alert Running',
  };

  return (
    <div className={`${style.stato}`}>
      <div className={style.iconastato}>
        {statoSensore === 'rec' ? (
          <div className={style.iconastatoRec}>
            <div className={style.lancia}></div>
            <img
              src={`images/${statoSensore}-led.svg`}
              alt="icona rec"
            />
          </div>
        ) : (
          <img
            src={`images/${statoSensore}-led.svg`}
            alt="icona ok"
          />
        )}
      </div>
      <div className={`${style.datiStato} ${style[statoSensore]}`}>
        <div className={style.label}>{nomeStatoInScheda(statoSensore)}</div>
        <div className={style.datoLabel}>
          <RiTerminalFill />
          {uiStatiSensore[statoSensore]}
        </div>
      </div>
    </div>
  );
};

type RecButtonProps = {
  applicationID: string;
  nodeID: number;
  type: RecButtonType;
};

type RecButtonType = 'ok' | 'rec';

const RecButton: FC<RecButtonProps> = ({ applicationID, nodeID, type }) => {
  const [disabled, setDisabled] = useState(false);
  const userSharedData = useContext(UserContext);

  const buttonClass = type === 'ok' ? '' : 'stop-rec';

  const text = type === 'ok' ? 'Inizia Rilevamento' : 'Stop Rilevamento';
  const command = type === 'ok' ? CommandType.START_REC : CommandType.END_REC;

  async function sendCommand(applicationID: string, nodeID: number) {
    setDisabled(true);

    try {
      await userSharedData.sendCommand(applicationID, nodeID, command);
      console.log('stato aggiornato');
      setDisabled(false);
    } catch (error) {
      console.error('ORRORE ED ERRORE, QUALCUNO MI AIUTI...', error);
    }
  }

  return (
    <div className={style.wrapperbutton}>
      <button
        className={`${buttonClass}`}
        disabled={disabled}
        onClick={() => sendCommand(applicationID, nodeID)}
      >
        {text}
      </button>
    </div>
  );
};

type HandleButtonProps = {
  state: NodeState;
  setConfirmState: Dispatch<SetStateAction<NodeState | undefined>>;
};

const HandleButton: FC<HandleButtonProps> = ({ state, setConfirmState }) => {
  const [disabled, setDisabled] = useState(false);

  async function handle() {
    setDisabled(true);

    try {
      setConfirmState(state);
      console.log('stato aggiornato');
      setDisabled(false);
    } catch (error) {
      console.error('ORRORE ED ERRORE, QUALCUNO MI AIUTI...', error);
    }
  }

  return (
    <div className={style.wrapperbutton}>
      <button
        className={'alert'}
        disabled={disabled}
        onClick={() => handle()}
      >
        Gestisci Allerta
      </button>
    </div>
  );
};

/* COMPONENTE PRINCIPALE */

type BoxStakerProps = {
  isAlert: boolean;
  node: Node;
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const BoxStaker: FC<BoxStakerProps> = ({ node, setStakerClicked, isAlert }) => {
  const [dataSingoloSensore, setDataSingoloSensore] = useState<number>(1);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [sessionIDList, setSessionIDList] = useState<number[]>([]);

  const userSharedData = useContext(UserContext);
  const share = useContext(ShareContext);
  console.log(node.state, 'nodestate');

  const getData = async (id: number) => {
    const readings = await userSharedData.getSession(node.nodeID, id);
    setReadings(readings);
    const IDs = await userSharedData.getSessionIDs(node.nodeID);
    setSessionIDList(IDs);
  };

  useEffect(() => {
    getData(-1);
  }, []);

  useEffect(() => {
    userSharedData.socket?.on('change-reading', () => {
      console.log('[SocketIO] Detected change');
      getData(-1);
    });

    return () => {
      userSharedData.socket?.off('change-reading');
    };
  }, [getData]);

  return (
    <motion.div
      key={node.nodeID}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={style.schedaSensore}
    >
      <section className={style.layoutSensori}>
        <header>
          <div>
            <div className={style.titleNodo}>
              <div className={style.titoletto}>Reach Staker</div>
              <div className={style.codiceStaker}>{node.nodeName}</div>
            </div>
            <div
              className={`${
                (node.state === 'ok' ||
                  node.state === 'rec' ||
                  node.state === 'off') &&
                style.wrapperStatoSensore
              }`}
            >
              <StatoSensore statoSensore={node.state} />

              {/* Barra opzionale in caso di alert */}
              {(node.state === 'alert-ready' ||
                node.state === 'alert-running') && (
                <div className={style.wrapperAlert}>
                  {node.state === 'alert-ready' ? (
                    <img
                      src="/images/alert-back.svg"
                      alt="back alert"
                    />
                  ) : (
                    node.state === 'alert-running' && <AlertRunning />
                  )}
                </div>
              )}

              {/* Sezione pulsanti */}
              <div className={style.buttonSection}>
                {(node.state === 'ok' ||
                  node.state === 'rec' ||
                  node.state === 'alert-running') && (
                  <RecButton
                    applicationID={node.applicationID}
                    nodeID={node.nodeID}
                    type={node.state === 'alert-running' ? 'rec' : node.state}
                  />
                )}
                {(node.state === 'alert-ready' ||
                  node.state === 'alert-running') && (
                  <HandleButton
                    state={node.state}
                    setConfirmState={share.setConfirmState}
                  />
                )}
              </div>
            </div>
          </div>

          {readings.length && (
            <Nodo
              isAlert={isAlert}
              dataSingoloSensore={dataSingoloSensore}
              setDataSingoloSensore={setDataSingoloSensore}
              datiLettureUI={datiLetture(readings)}
            />
          )}
        </header>
      </section>
      <section className={style.layoutGraph}>
        <button
          className={style.backToDash}
          onClick={() => setStakerClicked(-1)}
        >
          back
        </button>
        {readings.length && (
          <WrapperGraph
            dataSingoloSensore={dataSingoloSensore}
            datiLettureUI={datiLetture(readings)}
          />
        )}
      </section>
      <StoricoSessioni
        sessionIDList={sessionIDList}
        node={node}
      />
    </motion.div>
  );
};

export default BoxStaker;
