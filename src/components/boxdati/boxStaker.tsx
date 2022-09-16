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
import { Rilevatore } from '../../typings/ui';
import AlertRunning from './specials/alertRunning';

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

type BtnStartRecProps = {
  applicationID: string;
  nodeID: number;
};

const BtnStartRec: FC<BtnStartRecProps> = ({ applicationID, nodeID }) => {
  const [statoInvioDati, setStatoInvioDati] = useState(false);
  const userSharedData = useContext(UserContext);

  function iniziaLettura(applicationID: string, nodeID: number) {
    setStatoInvioDati(true);

    userSharedData
      .sendCommand(applicationID, nodeID, 0)
      .then(() => {
        console.log('stato aggiornato');
        setStatoInvioDati(false);
      })
      .catch((error) => {
        console.error('ORRORE ED ERRORE, QUALCUNO MI AIUTI...', error);
      });
  }

  return (
    <div className={style.wrapperbutton}>
      <button
        disabled={statoInvioDati}
        onClick={() => iniziaLettura(applicationID, nodeID)}
      >
        Inizia Rilevamento
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
  const [datiLettureUI, setDatiLettureUI] = useState<Rilevatore[]>([]);
  const [sessionIDList, setSessionIDList] = useState<number[]>([]);

  const userSharedData = useContext(UserContext);
  const share = useContext(ShareContext);
  console.log(node.state, 'nodestate');

  const getData = async () => {
    const readings = await userSharedData.getSession(node.nodeID, -1);
    setDatiLettureUI(datiLetture(readings));
    const IDs = await userSharedData.getSessionIDs(node.nodeID);
    setSessionIDList(IDs);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    userSharedData.socket?.on('change-reading', () => {
      console.log('[SocketIO] Detected change');
      getData();
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
              {node.state === 'ok' && (
                <BtnStartRec
                  applicationID={node.applicationID}
                  nodeID={node.nodeID}
                />
              )}
              {node.state === 'rec' && (
                <button
                  className="alert-big stop"
                  onClick={() => {
                    console.log('test stop');
                  }}
                >
                  Stop Rilevamento
                </button>
              )}
            </div>
          </div>
          {(node.state === 'alert-ready' || node.state === 'alert-running') && (
            <>
              <div className={style.wrapperAlert}>
                {node.state === 'alert-ready' ? (
                  <img
                    src="/images/alert-back.svg"
                    alt="back alert"
                  />
                ) : (
                  <AlertRunning />
                )}
              </div>
              <div className={style.buttonWrapper}>
                {node.state === 'alert-ready' ? (
                  <button
                    className="alert"
                    onClick={() => share.setConfirmState(node.state)}
                  >
                    Gestisci Allerta
                  </button>
                ) : (
                  node.state === 'alert-running' && (
                    <button
                      className="alert-big stop"
                      onClick={() => share.setConfirmState(node.state)}
                    >
                      Stop
                    </button>
                  )
                )}
              </div>
            </>
          )}
          {datiLettureUI.length && (
            <Nodo
              isAlert={isAlert}
              dataSingoloSensore={dataSingoloSensore}
              setDataSingoloSensore={setDataSingoloSensore}
              datiLettureUI={datiLettureUI}
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
        <WrapperGraph
          dataSingoloSensore={dataSingoloSensore}
          datiLettureUI={datiLettureUI}
          sessionIDList={sessionIDList}
        />
      </section>
    </motion.div>
  );
};

export default BoxStaker;
