import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import { FiSettings, FiSave } from 'react-icons/fi';
import style from './settingSensori.module.scss';

const SettingSensori: FC = () => {
  const [open, setOpen] = useState(false);
  const variants = {
    open: { top: 0 },
    close: { top: '104%' },
  };

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

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
          <header>
            <div>
              <button
                className={style.settingSensoriBtnBack}
                onClick={() => setOpen((prev) => !prev)}
              >
                Back
              </button>
              <h3 className={style.title}>Setting sensori</h3>
            </div>
            <div className={style.demo}>
              <button className={style.demoBtn}>Demo1</button>
              <button className={style.demoBtn}>Demo2</button>
            </div>
          </header>
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
            <div className={style.singleSensor}>
              <h3>2</h3>
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
            <div className={style.singleSensor}>
              <h3>3</h3>
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
            <div className={style.singleSensor}>
              <h3>4</h3>
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
            <button
              type="submit"
              className={style.sensoriSetBtn}
              onClick={(e) => handleSubmit(e)}
            >
              <FiSave /> Salva
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
};

export default SettingSensori;
