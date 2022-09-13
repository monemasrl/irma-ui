import React, { FC } from 'react';
import { Sensore } from '../../../../typings/ui';
import style from './graphs.module.scss';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
type Props = {
  datiSensore: Sensore[];
  sensore: number;
};

const Graph: FC<Props> = ({ datiSensore, sensore }) => {
  console.log(datiSensore, sensore);

  return (
    <div className={style.graphItem}>
      {' '}
      <LineChart
        width={500}
        height={200}
        data={datiSensore}
      >
        <Line
          type="monotone"
          dataKey="window1_count"
          stroke="#004a74"
        />
        <Line
          type="monotone"
          dataKey="window2_count"
          stroke="#0eb1b0"
        />
        <Line
          type="monotone"
          dataKey="window3_count"
          stroke="#8884d8"
        />
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"
        />
        <XAxis dataKey="readingID" />
        <YAxis />
        <Legend />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Graph;
