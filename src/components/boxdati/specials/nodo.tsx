import React, { FC } from 'react';
import Reading from '../../../typings/reading';
import { Rilevatore } from '../../../typings/ui';
import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  Letture: Reading[];
}

const Nodo: FC<Props> = (Props) => {
  console.log('letture', Props.Letture);

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

  const datiLettureUI = datiLetture(Props.Letture);
  console.log(datiLettureUI[0].id);

  return (
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
  );
};

export default Nodo;
