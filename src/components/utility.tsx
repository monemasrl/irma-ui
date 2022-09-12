import { Rilevatore } from '../typings/ui';
import Reading from '../typings/reading';

function datiLetture(letture: Reading[]): Rilevatore[] {
  const arrayDati: Rilevatore[] = [];
  for (let i = 1; i <= 4; i++) {
    const sensori = letture.filter((item) => {
      return parseInt(item.canID) === i;
    });

    const rilevatore: Rilevatore = {
      id: i,
      sensore1: [],
      sensore2: [],
    };

    for (let a = 0; a < sensori.length; a++) {
      if (sensori[a].sensorNumber === '1') {
        rilevatore.sensore1.push(sensori[a]);
      } else {
        rilevatore.sensore2.push(sensori[a]);
      }
    }

    arrayDati.push(rilevatore);
  }
  console.log('letture', arrayDati);
  return arrayDati;
}

export { datiLetture };
