import React, { FC } from 'react';
import { Sensore } from '../../../typings/ui';
import style from './nodo.module.scss';

type Props = {
  dato: Sensore[];
};
const BarraChart: FC<Props> = ({ dato }) => {
  return <div className={style.wrapperBarra}>{dato[0].dangerLevel}</div>;
};

export default BarraChart;
