import React, { FC, useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import style from './storicoSessioni.module.scss';
import { UserContext } from '../../../context/user-context';
import Node from '../../../typings/node';
import { datiLetture } from '../../../utils/datiLetture';
import { Rilevatore } from '../../../typings/ui';
import Graph from './graphs/graph';
import { parseUnixTimestamp } from '../../../utils/parseDate';
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai';
import Loader from '../../loaders/loader';

type Props = {
  sessionIDList: number[];
  node: Node;
};

const StoricoSessioni: FC<Props> = ({ sessionIDList, node }) => {
  const [storico, setStorico] = useState(false);
  const [rilevatoreId, setRilevatoreId] = useState(1);
  const [sessioni, setSessioni] = useState<Rilevatore[]>([]);
  const [currentSessionActive, setCurrentSessionActive] = useState(
    sessionIDList[0]
  );
  const userSharedData = useContext(UserContext);

  const getData = async (id: number) => {
    const creaSessioni = await userSharedData.getSession(node.nodeID, id);
    const datiSensore = creaSessioni.filter((item) => {
      return item.sessionID == id;
    });

    const datiFiltrati = datiLetture(datiSensore);
    setSessioni(datiFiltrati);
  };

  useEffect(() => {
    getData(sessionIDList[0]);
    setCurrentSessionActive(sessionIDList[0]);
  }, [sessionIDList]);

  const variants = {
    initial: { opacity: 0, x: '1000px' },
    open: { opacity: 1, x: 0 },
    close: { opacity: 0, x: '100%' },
  };
  console.log('sessiondata', sessioni);

  return (
    <>
      {' '}
      <button
        className={style.storicoBtn}
        onClick={() => setStorico((prev) => !prev)}
      >
        Storico
      </button>
      <AnimatePresence>
        <motion.section
          className={style.storicoSensore}
          variants={variants}
          initial={'initial'}
          animate={storico && sessionIDList.length ? 'open' : 'close'}
          transition={{
            duration: 0.5,
            default: { ease: 'easeInOut' },
          }}
        >
          <div className={style.storicoLayoutLeft}>
            <button
              className={style.storicoBtnBack}
              onClick={() => setStorico((prev) => !prev)}
            >
              Back
            </button>
            <h3>Storico sessioni</h3>
            <ul>
              {sessionIDList.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      getData(item);
                      setCurrentSessionActive(item);
                    }}
                    key={item}
                    className={`${
                      currentSessionActive === sessionIDList[index]
                        ? style['active']
                        : ''
                    }`}
                  >
                    <div>
                      <AiFillCalendar />
                      {parseUnixTimestamp(item, false, true)}
                    </div>
                    <div>
                      <AiFillClockCircle />
                      {parseUnixTimestamp(item, true, false)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={style.storicoLayoutRight}>
            <div className={style.navRilevatore}>
              <h4>Rilevatore</h4>
              <ul>
                {sessioni.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className={`${
                        sessioni[rilevatoreId - 1] === item && style.active
                      }
                    } ${style.liRilevatore}`}
                      onClick={() => setRilevatoreId(item.id)}
                    >
                      {item.id}
                    </li>
                  );
                })}
              </ul>
            </div>
            {sessioni.length ? (
              <div className={style.graphs}>
                <div className={style.boxGraphChart}>
                  <h4>Sensore Alto</h4>
                  <Graph datiSensore={sessioni[rilevatoreId - 1]['sensore1']} />
                </div>
                <div className={style.boxGraphChart}>
                  <h4>Sensore Basso</h4>
                  <Graph datiSensore={sessioni[rilevatoreId - 1]['sensore2']} />
                </div>
              </div>
            ) : (
              <Loader
                immagineLoader={'/images/cont.svg'}
                number={4}
                text="Loading Session Data"
              />
            )}
          </div>{' '}
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default React.memo(StoricoSessioni);
