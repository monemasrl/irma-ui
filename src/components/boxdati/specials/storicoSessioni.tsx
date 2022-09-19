import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import style from './storicoSessioni.module.scss';

type Props = {
  sessionIDList: number[];
};

const StoricoSessioni: FC<Props> = ({ sessionIDList }) => {
  const [storico, setStorico] = useState(false);
  // const [rilevatoreActive, setRilevatoreActive] = useState(0);

  const variants = {
    open: { top: 0 },
    close: { top: '99.5%' },
  };
  return (
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
      <div className={style.storicoLayoutLeft}>
        <button
          className={style.storicoBtnBack}
          onClick={() => setStorico((prev) => !prev)}
        >
          Back
        </button>
        <h3>Storico sessioni</h3>
        <ul>
          {sessionIDList.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <div className={style.storicoLayoutRight}>
        <div className={style.navRilevatore}>
          <h4>Rilevatore</h4>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        <div className={style.navSensore}>
          <h4>Sensore</h4>
          <ul>
            <li>Sensore Alto</li>
            <li>Sensore Basso</li>
          </ul>
        </div>
        <div className={style.graphs}>Grafici</div>
      </div>
    </motion.section>
  );
};

export default StoricoSessioni;
