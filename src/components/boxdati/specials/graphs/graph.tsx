import React, { FC } from 'react';
import style from './graphs.module.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import GraphData from '../../../../typings/graphData';
import { Sensore } from '../../../../typings/ui';
import { parseUnixTimestamp } from '../../../../utils/parseDate';

type Props = {
  datiSensore: Sensore[];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label3">{`Window3 : ${payload[2].value}`}</p>
        <p className="label2">{`Window2 : ${payload[1].value}`}</p>
        <p className="label1">{`Window1 : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const toGraphData = (sensor: Sensore): GraphData => {
  const data: GraphData = (({
    readingID,
    window1,
    window2,
    window3,
    dangerLevel,
  }) => ({
    readingID: parseUnixTimestamp(readingID, true, false),
    window1,
    window2,
    window3,
    dangerLevel,
  }))(sensor);

  return data;
};

const Graph: FC<Props> = ({ datiSensore }) => {
  const datiGraph = datiSensore.map((item) => toGraphData(item));

  return (
    <>
      <div
        className={style.graphItem}
        style={{ height: 200, width: '100%' }}
      >
        <AreaChart
          data={datiGraph || []}
          width={500}
          height={200}
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
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="window1"
            stackId="1"
            stroke="#afb9c9"
            fill="#00577c"
          />
          <Area
            type="monotone"
            dataKey="window2"
            stackId="1"
            stroke="#428daa"
            fill="#428daa"
          />
          <Area
            type="monotone"
            dataKey="window3"
            stackId="1"
            stroke="#8bb0b5"
            fill="#8fcfe8"
          />
        </AreaChart>
      </div>
    </>
  );
};

export default React.memo(Graph);
