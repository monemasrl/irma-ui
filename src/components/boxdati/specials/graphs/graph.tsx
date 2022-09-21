import React, { FC } from 'react';
import { Sensore } from '../../../../typings/ui';
import style from './graphs.module.scss';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
type Props = {
  datiSensore: Sensore[];
  sensore: number;
};

const Graph: FC<Props> = ({ datiSensore }) => {
  return (
    <>
      <div className={style.graphItem}>
        {' '}
        <AreaChart
          width={500}
          height={200}
          data={datiSensore || []}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="readingID" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="window1Count"
            stackId="1"
            stroke="#afb9c9"
            fill="#00577c"
          />
          <Area
            type="monotone"
            dataKey="window2Count"
            stackId="1"
            stroke="#428daa"
            fill="#428daa"
          />
          <Area
            type="monotone"
            dataKey="window3Count"
            stackId="1"
            stroke="#8bb0b5"
            fill="#8fcfe8"
          />
          <Legend />
        </AreaChart>
      </div>
      <div className={style.pericoloGraph}>
        <BarChart
          width={500}
          height={200}
          data={datiSensore || []}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="readingID" />
          <YAxis />

          <Bar
            dataKey="dangerLevel"
            fill="#ce0303"
          />

          <Legend />
          <Tooltip />
        </BarChart>
      </div>
    </>
  );
};

export default Graph;
