import React, { FC } from 'react';
import style from './boxDati.module.scss';
import { motion } from 'framer-motion';
import { StakerDefaultData } from '../../App';

type Props = {
  datiDefault: StakerDefaultData;
};

const BoxDefault: FC<Props> = ({ datiDefault }) => {
  return (
    <motion.header
      key={JSON.stringify(datiDefault)}
      initial={{ opacity: 0, top: 20, position: 'relative' }}
      animate={{ opacity: 1, top: 0, position: 'relative' }}
      exit={{ opacity: 0, top: 20 }}
      transition={{ duration: 0.5 }}
    >
      <ul>
        <li>
          <div className={style.title}>
            <div className={style.titoletto}>Reach Staker Totali</div>
            <div className={style.codiceStaker}>{datiDefault.numeroStaker}</div>
          </div>
        </li>
        <li>
          <div className={style.title}>
            <div className={style.titoletto}>Ore operative totali</div>
            <div className={style.codiceStaker}>
              {datiDefault.oreOperativeTotali}
            </div>
          </div>
        </li>
        <li>
          <div className={style.title}>
            <div className={style.titoletto}>Allerte</div>
            <div className={style.codiceStaker}>
              {datiDefault.allerteAttuali}
            </div>
          </div>
        </li>
      </ul>
    </motion.header>
  );
};

export default BoxDefault;
