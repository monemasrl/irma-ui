import React, { FC } from 'react';
import style from './boxDati.module.scss';
import { RiTerminalFill } from 'react-icons/ri';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { NodeState } from '../../typings/node';
import { TotalReading, WindowReading } from '../../typings/reading';
import AlertRunning from './specials/alertRunning';
import Node from '../../typings/node';

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
  totalReadings: TotalReading[];
  windowReadings: WindowReading[];
};

const BoxAlert: FC<BoxAlertProps> = ({
  node,
  totalReadings,
  windowReadings,
}) => {
  const share = useContext(ShareContext);
  console.log('node', node);
  console.log('readings', totalReadings, windowReadings);

  return (
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
        {node.state === 'alert-ready' && (
          <button
            className="alert"
            onClick={() => share.setConfirmState(node.state)}
          >
            Gestisci Allerta
          </button>
        )}
      </div>
    </header>
  );
};

export default BoxAlert;
