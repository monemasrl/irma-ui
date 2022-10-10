import React, { FC, Dispatch, SetStateAction } from 'react';
import { NodeState } from '../../../typings/node';
import { Rilevatore } from '../../../typings/ui';
import BoxRilevatore from './boxRilevatore';
import style from './nodo.module.scss';

interface Props {
  state: NodeState;
  datiLettureUI: Rilevatore[];
  dataSingoloSensore: number;
  setDataSingoloSensore: Dispatch<SetStateAction<number>>;
  canId?: number;
}

const Nodo: FC<Props> = ({
  state,
  datiLettureUI,
  dataSingoloSensore,
  setDataSingoloSensore,
  canId,
}) => {
  console.log(canId);

  return (
    <div
      className={`${style.sezioneSensori} ${
        state === 'alert-ready' || state === 'alert-running'
          ? style['alert']
          : ''
      }`}
    >
      <h3>Rilevatori</h3>
      <div className={style.wrapperRilevatore}>
        {datiLettureUI.length &&
          datiLettureUI.map((item) => {
            return (
              <BoxRilevatore
                key={item.id}
                keyId={item.id}
                rilevatore={item}
                setDataSingoloSensore={setDataSingoloSensore}
                dataSingoloSensore={dataSingoloSensore}
                canId={canId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Nodo;
