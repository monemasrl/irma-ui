import React, { FC, useState } from 'react';
import { Rilevatore } from '../../../../typings/ui';
import Graph from './graph';
import style from './graphs.module.scss';

type Props = {
  dataSingoloSensore: number;
  datiLettureUI: Rilevatore[];
};

const WrapperGraph: FC<Props> = ({ dataSingoloSensore, datiLettureUI }) => {
  const datiSensore = datiLettureUI?.filter((item) => {
    return item.id === dataSingoloSensore;
  });
  const [sensore, setSensore] = useState(1);

  return (
    <div className={style.wrapperGraph}>
      <h3> Rilevatore {dataSingoloSensore}</h3>
      <nav>
        <ul>
          <li
            className={`${sensore === 1 ? style['active'] : ''}`}
            onClick={() => setSensore(1)}
          >
            <span>Sensore Alto</span>
          </li>
          <li
            className={`${sensore === 2 ? style['active'] : ''}`}
            onClick={() => setSensore(2)}
          >
            <span>Sensore Basso</span>
          </li>
        </ul>
      </nav>
      <section className={style.boxGraph}>
        {sensore === 1 ? (
          <Graph
            datiSensore={datiSensore[0].sensore1}
            sensore={sensore}
          />
        ) : (
          <Graph
            datiSensore={datiSensore[0].sensore2}
            sensore={sensore}
          />
        )}
      </section>
    </div>
  );
};

export default WrapperGraph;
