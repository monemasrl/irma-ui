import React, { useState, useEffect, FC } from 'react';
import { Sensore } from '../../../typings/ui';
import style from './nodo.module.scss';

type Props = {
  dato: Sensore[];
};
const BarraChart: FC<Props> = ({ dato }) => {
  const [completed, setCompleted] = useState(10);
  const dangerLevel = dato[dato.length - 1].dangerLevel;

  useEffect(() => {
    setCompleted(dangerLevel);
  }, []);

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
        className={`${style.labelStyles} ${style[colorBar(completed)]}`}
        style={{ width: `${completed > 0 ? completed * 10 : 10}%` }}
      >{`${completed}`}</span>
    </div>
  );
};

export default BarraChart;
