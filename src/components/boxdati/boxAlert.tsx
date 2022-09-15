import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import style from './boxDati.module.scss';
import { RiTerminalFill } from 'react-icons/ri';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { NodeState } from '../../typings/node';
import AlertRunning from './specials/alertRunning';
import Node from '../../typings/node';
import Nodo from './specials/nodo';
import { datiLetture } from '../../utils/datiLetture';
import { motion } from 'framer-motion';
import WrapperGraph from './specials/graphs/wrapperGraph';
import { UserContext } from '../../context/user-context';
import { Rilevatore } from '../../typings/ui';
type StatoSensoreProps = {
  statoSensore: NodeState;
};

const StatoSensore: FC<StatoSensoreProps> = ({ statoSensore }) => {
  const share = useContext(ShareContext);

  return (
    <div className={`${style.stato}`}>
      <div className={style.iconastato}>
        <img
          src={`images/alert-led.svg`}
          alt="icona alert"
        />
      </div>
      <div className={`${style.datiStato} ${style[statoSensore]}`}>
        <div className={style.label}>
          alert
          <div className={style.running}>
            {statoSensore === 'alert-running' && 'Running'}
          </div>
        </div>
        <div className={style.datoLabel}>
          <RiTerminalFill />
          {share.uiStatiSensore[statoSensore]}
        </div>
      </div>
    </div>
  );
};

type BoxAlertProps = {
  node: Node;
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const BoxAlert: FC<BoxAlertProps> = ({ node, setStakerClicked }) => {
  const [dataSingoloSensore, setDataSingoloSensore] = useState<number>(1);
  const [datiLettureUI, setDatiLettureUI] = useState<Rilevatore[]>([]);
  const [sessionIDList, setSessionIDList] = useState<number[]>([]);

  const share = useContext(ShareContext);
  const userSharedData = useContext(UserContext);

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
          <div className={style.title}>
            <div className={style.titoletto}>Reach Staker</div>
            <div className={style.codiceStaker}>{node.nodeName}</div>
          </div>
          <div className={style.subData}>
            <StatoSensore statoSensore={node.state} />
          </div>
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
                  className="alert"
                  onClick={() => share.setConfirmState(node.state)}
                >
                  Stop
                </button>
              )
            )}
          </div>
          {datiLettureUI.length && (
            <Nodo
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

export default BoxAlert;
