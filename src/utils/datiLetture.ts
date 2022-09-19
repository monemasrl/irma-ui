import Reading from '../typings/reading';
import { Rilevatore } from '../typings/ui';
import groupBy from './groupBy';

function datiLetture(readings: Reading[]): Rilevatore[] {
  const arrayDati: Rilevatore[] = [];

  const readingsByCanID = groupBy((a) => a.canID, readings);

  for (const [canID, readings] of Object.entries(readingsByCanID)) {
    const rilevatore: Rilevatore = {
      id: parseInt(canID),
      sensore1: [],
      sensore2: [],
    };

    readings.forEach((reading) => {
      if (reading.sensorNumber === 1) {
        rilevatore.sensore1.push(reading);
      } else if (reading.sensorNumber === 2) {
        rilevatore.sensore2.push(reading);
      }
    });

    arrayDati.push(rilevatore);
  }
  console.log('letture', arrayDati);
  return arrayDati;
}

export { datiLetture };
