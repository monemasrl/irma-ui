import React, { FC, Dispatch, SetStateAction } from 'react';
import { Rilevatore } from '../../../typings/ui';
import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  isAlert: boolean;
  datiLettureUI: Rilevatore[];
  dataSingoloSensore: number;
  setDataSingoloSensore: Dispatch<SetStateAction<number>>;
}

const Nodo: FC<Props> = ({
  isAlert,
  datiLettureUI,
  dataSingoloSensore,
  setDataSingoloSensore,
}) => {
  return (
    <div className={`${style.sezioneSensori} ${isAlert ? style['alert'] : ''}`}>
      <h3>Rilevatori</h3>
      <div className={style.wrapperRilevatore}>
        {datiLettureUI.map((item) => {
          console.log('datiletture', item);
          return (
            <BoxRilevatore
              key={item.id}
              keyId={item.id}
              rilevatore={item}
              setDataSingoloSensore={setDataSingoloSensore}
              dataSingoloSensore={dataSingoloSensore}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Nodo;
