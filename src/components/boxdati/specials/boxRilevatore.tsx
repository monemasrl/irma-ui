import React, { FC, Dispatch, SetStateAction } from 'react';
import { Rilevatore } from '../../../typings/ui';
import BarraChart from './barraChart';
import style from './nodo.module.scss';

type Props = {
  keyId: number;
  rilevatore: Rilevatore;
  setDataSingoloSensore: Dispatch<SetStateAction<number>>;
  dataSingoloSensore: number;
};

const BoxRilevatore: FC<Props> = ({
  keyId,
  rilevatore,
  dataSingoloSensore,
  setDataSingoloSensore,
}) => {
  console.log('key', keyId);
  console.log('dataSingoloSensore', dataSingoloSensore);

  function alertColor(level: number) {
    if (level > 6) {
      return 'alert';
    }
    return '';
  }

  return (
    <div
      className={`${style.boxRilevatore} 
      ${
        style[
          alertColor(
            rilevatore.sensore1[rilevatore.sensore1.length - 1].dangerLevel
          )
        ]
      } ${dataSingoloSensore === keyId ? style['open'] : ''}`}
      key={keyId}
      onClick={() => setDataSingoloSensore(rilevatore.id)}
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
