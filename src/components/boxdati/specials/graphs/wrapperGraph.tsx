import React, { FC } from 'react';
import { Rilevatore } from '../../../../typings/ui';
import { parseUnixTimestamp } from '../../../../utils/parseDate';
import Graph from './graph';
import style from './graphs.module.scss';
import Timer from '../timer';
import { AlertInfo } from '../../../../typings/alert';
type Props = {
  dataSingoloSensore: number;
  datiLettureUI: Rilevatore[];
  alertInfo?: AlertInfo;
};

const WrapperGraph: FC<Props> = ({
  dataSingoloSensore,
  datiLettureUI,
  alertInfo,
}) => {
  const datiSensore = datiLettureUI?.filter((item) => {
    return item.id === dataSingoloSensore;
  });
  console.log('alertInfo', alertInfo);

  return (
    <div className={style.wrapperGraph}>
      <header>
        <div className={style.datiNomi}>
          <h3> Rilevatore {dataSingoloSensore}</h3>
          <h4>
            Sessione:{' '}
            {parseUnixTimestamp(datiLettureUI[0].sensore1[0].sessionID)}
          </h4>
        </div>
        {alertInfo !== undefined && (
          <Timer dateTimer={datiLettureUI[0].sensore1[0].sessionID} />
        )}
      </header>
      <section className={style.boxGraph}>
        <h4>Sensore Alto</h4>
        <Graph datiSensore={datiSensore[0].sensore1} />
      </section>
      <section className={style.boxGraph}>
        <h4>Sensore Basso</h4>
        <Graph datiSensore={datiSensore[0].sensore2} />
      </section>
    </div>
  );
};

export default WrapperGraph;
