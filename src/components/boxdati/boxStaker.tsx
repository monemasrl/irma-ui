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
import Loader from '../loaders/loader';
import { AlertInfo } from '../../typings/alert';
import useMediaQuery from '../../hooks/useMediaQuery';
import SettingsPanel from './specials/settingSensori';

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

type RecButtonType = 'ok' | 'rec' | 'alert-rec';

const RecButton: FC<RecButtonProps> = ({ applicationID, nodeID, type }) => {
  const [disabled, setDisabled] = useState(false);
  const userSharedData = useContext(UserContext);

  const buttonClass =
    type === 'ok' ? '' : type === 'alert-rec' ? 'alert-rec' : 'stop-rec';

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
  node: Node;
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const BoxStaker: FC<BoxStakerProps> = ({ node, setStakerClicked }) => {
  const [dataSingoloSensore, setDataSingoloSensore] = useState<number>(1);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [sessionIDList, setSessionIDList] = useState<number[]>([]);
  const [alertInfo, setAlertInfo] = useState<AlertInfo | undefined>(undefined);

  const userSharedData = useContext(UserContext);
  const share = useContext(ShareContext);
  const isMobile = useMediaQuery('(max-width: 760px)');

  console.log('alertInfo', { alertInfo, node });

  const getData = async (id: number | 'latest') => {
    const readings = await userSharedData.getSession(node.nodeID, id);
    setReadings(readings);

    const IDs = await userSharedData.getSessionIDs(node.nodeID);
    setSessionIDList(IDs);

    if (
      (node.state === 'alert-ready' || node.state === 'alert-running') &&
      node.unhandledAlertIDs.length
    ) {
      const alertData = await userSharedData.getAlertInfo(
        node.unhandledAlertIDs[0]
      );
      setAlertInfo(alertData);
    } else {
      setAlertInfo(undefined);
    }
  };

  useEffect(() => {
    getData('latest');
  }, [node.unhandledAlertIDs]);

  useEffect(() => {
    userSharedData.socket?.on('change-reading', () => {
      console.log('[SocketIO] Detected change');
      getData('latest');
    });
    console.log(sessionIDList);

    return () => {
      userSharedData.socket?.off('change-reading');
    };
  }, [getData]);

  console.log('letture', readings);

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
          {isMobile && (
            <button
              className={style.backToDash}
              onClick={() => setStakerClicked(-1)}
            >
              back
            </button>
          )}
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
                    applicationID={node.application}
                    nodeID={node.nodeID}
                    type={
                      node.state === 'alert-running' ? 'alert-rec' : node.state
                    }
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

          {readings.length && !isMobile ? (
            <Nodo
              state={node.state}
              dataSingoloSensore={dataSingoloSensore}
              setDataSingoloSensore={setDataSingoloSensore}
              datiLettureUI={datiLetture(readings)}
              canId={alertInfo?.canID}
            />
          ) : (
            !isMobile && (
              <Loader
                immagineLoader={'/images/cont.svg'}
                number={4}
                text="Loading Sensor Data"
              />
            )
          )}
        </header>
      </section>
      {!isMobile && (
        <section className={style.layoutGraph}>
          <button
            className={style.backToDash}
            onClick={() => setStakerClicked(-1)}
          >
            back
          </button>
          {readings.length ? (
            <WrapperGraph
              dataSingoloSensore={dataSingoloSensore}
              datiLettureUI={datiLetture(readings)}
              alertInfo={alertInfo}
            />
          ) : (
            <Loader
              immagineLoader={'/images/cont.svg'}
              number={4}
              text="Loading Graph Data"
            />
          )}
        </section>
      )}
      {sessionIDList.length !== 0 && !isMobile && (
        <StoricoSessioni
          sessionIDList={sessionIDList}
          node={node}
        />
      )}
      {!isMobile && <SettingsPanel node={node} />}
    </motion.div>
  );
};

export default BoxStaker;
