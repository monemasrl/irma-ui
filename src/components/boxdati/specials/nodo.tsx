import React, { FC, Dispatch, SetStateAction } from 'react';
import Reading from '../../../typings/reading';
import { datiLetture } from '../../utility';
import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  Letture: Reading[];
  setDataSingoloSensore: Dispatch<SetStateAction<number>>;
}

const Nodo: FC<Props> = (Props) => {
  console.log('letture', Props.Letture);

  const datiLettureUI = datiLetture(Props.Letture);

  return (
    <div className={style.sezioneSensori}>
      <h3>Sensori</h3>
      <div className={style.wrapperRilevatore}>
        {datiLettureUI.map((item) => {
          return (
            <BoxRilevatore
              key={item.id}
              rilevatore={item}
              setDataSingoloSensore={Props.setDataSingoloSensore}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Nodo;
