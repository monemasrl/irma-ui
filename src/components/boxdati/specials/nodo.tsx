import React, { FC } from 'react';
import { TotalReading, WindowReading } from '../../../typings/reading';
import { Rilevatore } from '../../../typings/ui';
import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  totalReadings: TotalReading[];
  windowReadings: WindowReading[];
}

const Nodo: FC<Props> = ({ totalReadings, windowReadings }) => {
  console.log('letture', totalReadings, windowReadings);

  function datiLetture(
    totalReadings: TotalReading[],
    windowReadings: WindowReading[]
  ): Rilevatore[] {
    const arrayDati: Rilevatore[] = [];

    for (let i = 1; i <= 4; i++) {
      const sensori = totalReadings.filter((item) => {
        return parseInt(item.canID) === i;
      });

      const sensoriWindow = windowReadings.filter((item) => {
        return parseInt(item.canID) === i;
      });

      const rilevatore: Rilevatore = {
        id: i,
        sensore1: [],
        sensore1Windows: [],
        sensore2: [],
        sensore2Windows: [],
      };

      for (let a = 0; a < sensori.length; a++) {
        if (sensori[a].sensorNumber === '1') {
          rilevatore.sensore1.push(sensori[a]);
        } else {
          rilevatore.sensore2.push(sensori[a]);
        }
      }

      sensoriWindow.forEach((sensoreWindow) => {
        if (sensoreWindow.sensorNumber === '1') {
          rilevatore.sensore1Windows.push(sensoreWindow);
        } else {
          rilevatore.sensore2Windows.push(sensoreWindow);
        }
      });

      arrayDati.push(rilevatore);
    }
    console.log('letture', arrayDati);
    return arrayDati;
  }

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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Nodo;
