import React, { FC } from 'react';
import { Rilevatore } from '../../../typings/ui';
import BarraChart from './barraChart';
import style from './nodo.module.scss';

type Props = {
  key: number;
  rilevatore: Rilevatore;
};

const BoxRilevatore: FC<Props> = ({ key, rilevatore }) => {
  console.log('rilevatore', rilevatore.sensore1);

  return (
    <div
      className={style.boxRilevatore}
      key={key}
    >
      <div className={style.idRilevatore}>{rilevatore.id}</div>
      <div className={style.wrapperSensori}>
        <div className={style.sensore}>
          <div className={style.idSensore}>n</div>{' '}
          <BarraChart dato={rilevatore.sensore1} />
        </div>
        <div className={style.sensore}>
          <div className={style.idSensore}>ɣ</div>
          <BarraChart dato={rilevatore.sensore2} />
        </div>
      </div>
    </div>
  );
};

export default BoxRilevatore;
