import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import style from './boxDati.module.scss';
import { RiTerminalFill } from 'react-icons/ri';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { NodeState } from '../../typings/node';
import { TotalReading, WindowReading } from '../../typings/reading';
import AlertRunning from './specials/alertRunning';
import Node from '../../typings/node';
import Nodo from './specials/nodo';
import { datiLetture } from '../../utils/datiLetture';
import WrapperGraph from './specials/graphs/wrapperGraph';
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
        <div className={style.label}>alert</div>
        <div className={style.datoLabel}>
          <RiTerminalFill />
          {statoSensore === 'alert-running' && 'Running'}
          {statoSensore === 'alert-ready' && 'Rilevata Anomalia'}
          {share.uiStatiSensore[statoSensore]}
        </div>
      </div>
    </div>
  );
};

type BoxAlertProps = {
  node: Node;
  setStakerClicked: Dispatch<SetStateAction<number>>;
  totalReadings: TotalReading[];
  windowReadings: WindowReading[];
};

const BoxAlert: FC<BoxAlertProps> = ({
  node,
  totalReadings,
  windowReadings,
  setStakerClicked,
}) => {
  const share = useContext(ShareContext);
  const [dataSingoloSensore, setDataSingoloSensore] = useState<number>(1);
  const datiLettureUI = datiLetture(totalReadings, windowReadings);

  return (
    <div
      key={node.nodeID}
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
                  className="alert-big stop"
                  onClick={() => share.setConfirmState(node.state)}
                >
                  Stop
                </button>
              )
            )}
          </div>
          {totalReadings.length && windowReadings.length && (
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
        />
      </section>
    </div>
  );
};

export default BoxAlert;
