import React, { FC } from 'react';
import { TotalReading, WindowReading } from '../../../typings/reading';
import { Rilevatore, Sensore } from '../../../typings/ui';
import groupBy from '../../../utils/groupBy';
import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  totalReadings: TotalReading[];
  windowReadings: WindowReading[];
}

const Nodo: FC<Props> = ({ totalReadings, windowReadings }) => {
  console.log('letture', totalReadings, windowReadings);

  const unifyReadings = (
    readings: (TotalReading | WindowReading)[]
  ): Sensore | undefined => {
    const unifiedReading = readings.reduce(
      (sensore: Sensore | undefined, item) => {
        if (!sensore) {
          sensore = {
            ...item,
            dangerLevel: 0,
            window1_count: 0,
            window2_count: 0,
            window3_count: 0,
          };
        }

        if ((item as TotalReading).dangerLevel !== undefined) {
          sensore.dangerLevel = (item as TotalReading).dangerLevel;
        } else {
          const winReading = item as WindowReading;
          if (winReading.windowNumber === 1) {
            sensore.window1_count = winReading.count;
          } else if (winReading.windowNumber === 2) {
            sensore.window2_count = winReading.count;
          } else if (winReading.windowNumber === 3) {
            sensore.window3_count = winReading.count;
          }
        }

        return sensore;
      },
      undefined
    );

    return unifiedReading;
  };

  function datiLetture(
    totalReadings: TotalReading[],
    windowReadings: WindowReading[]
  ): Rilevatore[] {
    const arrayDati: Rilevatore[] = [];

    const readings: (TotalReading | WindowReading)[] = (
      totalReadings as (TotalReading | WindowReading)[]
    ).concat(windowReadings);

    const readingsByCanID = groupBy((a) => a.canID, readings);

    for (const [canID, readings] of Object.entries(readingsByCanID)) {
      const rilevatore: Rilevatore = {
        id: parseInt(canID),
        sensore1: [],
        sensore2: [],
      };

      const readingsBySensorName = groupBy((a) => a.sensorNumber, readings);

      for (const [sensorNumber, readings] of Object.entries(
        readingsBySensorName
      )) {
        const readingsByReadingID = Object.values(
          groupBy((a) => a.readingID, readings)
        );

        readingsByReadingID.forEach((readings) => {
          const unifiedReading = unifyReadings(readings);
          if (!unifiedReading) return;

          if (sensorNumber === '1') {
            rilevatore.sensore1.push(unifiedReading);
          } else if (sensorNumber === '2') {
            rilevatore.sensore2.push(unifiedReading);
          }
        });
      }

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
