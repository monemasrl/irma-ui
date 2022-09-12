import React, { FC, Dispatch, SetStateAction } from 'react';
import { TotalReading, WindowReading } from '../../../typings/reading';
import { datiLetture } from '../../../utils/datiLetture';

import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  totalReadings: TotalReading[];
  windowReadings: WindowReading[];
  setDataSingoloSensore: Dispatch<SetStateAction<number>>;
}

const Nodo: FC<Props> = ({
  totalReadings,
  windowReadings,
  setDataSingoloSensore,
}) => {
  console.log('letture', totalReadings, windowReadings);
  const datiLettureUI = datiLetture(totalReadings, windowReadings);
  console.log(datiLettureUI[0].id);

  return (
    <div className={style.sezioneSensori}>
      <h3>Sensori</h3>
      <div className={style.wrapperRilevatore}>
        {datiLettureUI.map((item) => {
          return (
            <BoxRilevatore
              key={item.id}
              rilevatore={item}
              setDataSingoloSensore={setDataSingoloSensore}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Nodo;
