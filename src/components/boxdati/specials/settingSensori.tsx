import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import style from './settingSensori.module.scss';

const SettingSensori: FC = () => {
  const [open, setOpen] = useState(false);
  const variants = {
    open: { top: 0 },
    close: { top: '104%' },
  };
  return (
    <>
      <button
        className={style.settingSensoriBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiSettings />
      </button>
      <motion.section
        className={style.settingSensore}
        variants={variants}
        animate={open ? 'open' : 'close'}
        transition={{
          duration: 0.5,
          default: { ease: 'easeInOut' },
        }}
      >
        <div className={style.wrapperSetting}>
          {' '}
          <button
            className={style.settingSensoriBtnBack}
            onClick={() => setOpen((prev) => !prev)}
          >
            Back
          </button>
          <h3>Setting sensori</h3>
          <form action="">
            <div className={style.singleSensor}>
              <h3>1</h3>
              <div className={style.wrapperSetSensor}>
                <fieldset className={style.fieldHv}>
                  <label htmlFor="hv">HV</label>
                  <input
                    type="number"
                    id="hv"
                    className={style.hv}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    id="low"
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    id="high"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    id="low"
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    id="high"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    id="low"
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    id="high"
                  />
                </fieldset>
              </div>
              <div className={style.wrapperSetSensor}>
                <fieldset className={style.fieldHv}>
                  <label htmlFor="hv">HV</label>
                  <input
                    type="number"
                    id="hv"
                    className={style.hv}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    id="low"
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    id="high"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    id="low"
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    id="high"
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="low">Low</label>
                  <input
                    type="number"
                    id="low"
                  />
                  <label htmlFor="high">High</label>
                  <input
                    type="number"
                    id="high"
                  />
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </motion.section>
    </>
  );
};

export default SettingSensori;
