import React, { FC, Dispatch, SetStateAction } from 'react';
import { Rilevatore } from '../../../typings/ui';
import BarraChart from './barraChart';
import style from './nodo.module.scss';

type Props = {
  keyId: number;
  rilevatore: Rilevatore;
  setDataSingoloSensore: Dispatch<SetStateAction<number>>;
  dataSingoloSensore: number;
  canId?: number;
};

const BoxRilevatore: FC<Props> = ({
  keyId,
  rilevatore,
  dataSingoloSensore,
  setDataSingoloSensore,
  canId,
}) => {
  console.log(canId, keyId);

  function alertColor() {
    if (canId === keyId) {
      return 'alert';
    }
    return '';
  }

  return (
    <div
      className={`${style.boxRilevatore} 
      ${style[alertColor()]} ${
        dataSingoloSensore === keyId ? style['open'] : ''
      }`}
      key={keyId}
      onClick={() => setDataSingoloSensore(rilevatore.id)}
    >
      <div className={style.idRilevatore}>{rilevatore.id}</div>

      <BarraChart dato={rilevatore.sensore1} />
    </div>
  );
};

export default BoxRilevatore;
