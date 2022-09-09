import React, { FC } from 'react';
import Reading from '../../../typings/reading';
import style from './rilevatore.module.scss';

interface Props {
  Letture: Reading[];
}

const Rilevatore: FC<Props> = (Props) => {
  console.log('letture', Props.Letture);

  function datiLetture(letture: any[]) {
    const arrayDati: object[] = [];
    for (let i = 1; i <= 4; i++) {
      const sensori = letture.filter((item) => {
        return parseInt(item.canID) === i;
      });

      const rilevatore = {
        id: i,
        sensore1: [{}],
        sensore2: [{}],
      };
      console.log('sensori', sensori);
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
  console.log(datiLetture(Props.Letture));

  return (
    <div className={style.wrapperRivelatore}>{Props.Letture[0]?.canID}</div>
  );
};

export default Rilevatore;
