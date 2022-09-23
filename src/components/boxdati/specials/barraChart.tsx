import React, { FC } from 'react';
import { Sensore } from '../../../typings/ui';
import style from './nodo.module.scss';

type Props = {
  dato: Sensore[];
};
const BarraChart: FC<Props> = ({ dato }) => {
  const dangerLevel = dato[dato.length - 1].dangerLevel;

  function colorBar(level: number) {
    if (level <= 3) {
      return 'green';
    } else if (level <= 6 && level > 3) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  return (
    <div className={style.wrapperBarra}>
      <span
        className={`${style.labelStyles} ${style[colorBar(dangerLevel)]}`}
        style={{ width: `${dangerLevel > 0 ? dangerLevel * 10 : 10}%` }}
      >{`${dangerLevel}`}</span>
    </div>
  );
};

export default BarraChart;
