import React, { FC, useState } from 'react';
import { Rilevatore } from '../../../../typings/ui';
import Graph from './graph';
import style from './graphs.module.scss';

type Props = {
  dataSingoloSensore: number;
  datiLettureUI: Rilevatore[];
};

const WrapperGraph: FC<Props> = ({ dataSingoloSensore, datiLettureUI }) => {
  const datiSensore = datiLettureUI.filter((item) => {
    return item.id === dataSingoloSensore;
  });
  const [sensore, setSensore] = useState(1);
  //VERIFICARE COME FARE PER PARAMETRIZZARE LE CHIAVI DEGLI OGGETTI CON TS...
  return (
    <div className={style.wrapperGraph}>
      <nav>
        <ul>
          <li onClick={() => setSensore(1)}>n</li>
          <li onClick={() => setSensore(2)}>ɣ</li>
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
      <section className={style.storicoSensore}>
        {sensore === 1 ? (
          <ul>
            {datiSensore[0].sensore1.map((item) => {
              return <li key={item.readingID}>{item.publishedAt}</li>;
            })}
          </ul>
        ) : (
          ''
        )}
      </section>
    </div>
  );
};

export default WrapperGraph;
