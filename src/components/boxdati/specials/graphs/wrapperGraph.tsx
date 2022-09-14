import { motion } from 'framer-motion';
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
  const [storico, setStorico] = useState(false);

  const variants = {
    open: { top: 80 },
    close: { top: 530 },
  };
  //VERIFICARE COME FARE PER PARAMETRIZZARE LE CHIAVI DEGLI OGGETTI CON TS...
  return (
    <div className={style.wrapperGraph}>
      <h3> sensore {dataSingoloSensore}</h3>
      <nav>
        <ul>
          <li
            className={`${sensore === 1 ? style['active'] : ''}`}
            onClick={() => setSensore(1)}
          >
            n <span>Neutroni</span>
          </li>
          <li
            className={`${sensore === 2 ? style['active'] : ''}`}
            onClick={() => setSensore(2)}
          >
            ɣ <span>Fotoni</span>
          </li>
        </ul>
      </nav>
      <section className={style.boxGraph}>
        {datiSensore.length ? (
          <>
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
          </>
        ) : (
          'VOTO'
        )}
      </section>

      <motion.section
        className={style.storicoSensore}
        variants={variants}
        animate={storico ? 'open' : 'close'}
        transition={{
          x: { duration: 0.5 },
          default: { ease: 'easeInOut' },
        }}
      >
        <button
          className={style.storicoBtn}
          onClick={() => setStorico((prev) => !prev)}
        >
          Storico
        </button>
        {/* {sensore === 1 ? (
          <ul>
            {datiSensore[0].sensore1.map((item) => {
              return <li key={item.readingID}>{item.publishedAt}</li>;
            })}
          </ul>
        ) : (
          <ul>
            {datiSensore[0].sensore2.map((item) => {
              return <li key={item.readingID}>{item.publishedAt}</li>;
            })}
          </ul>
        )} */}
      </motion.section>
    </div>
  );
};

export default WrapperGraph;
