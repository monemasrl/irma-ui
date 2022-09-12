import React, { FC, SetStateAction, Dispatch } from 'react';
import style from './boxDati.module.scss';
import BoxStaker from './boxStaker';
import BoxAlert from './boxAlert';
import BoxConfirm from './modali/boxConfirm';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../loaders/loader';
import Reading from '../../typings/reading';
import StakerDefaultData from '../../typings/defaultData';
import Node from '../../typings/node';

type Props = {
  dati?: Reading[];
  datiDefault?: StakerDefaultData;
  node?: Node;
  stakerClicked: number;
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const BoxDati: FC<Props> = ({
  dati,
  stakerClicked,
  setStakerClicked,
  node,
}) => {
  const share = useContext(ShareContext);

  const variants = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  return (
    <AnimatePresence>
      {stakerClicked !== -1 && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className={`${style.boxDati} ${style.stakerDati} ${
            node ? style[node.state] : ''
          } ${share.confirmState ? style.modalOpen : ''}`}
        >
          {dati ? (
            <>
              {' '}
              {dati && node?.state === 'ok' && (
                <BoxStaker
                  node={node}
                  letture={dati}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {dati && node?.state === 'rec' && (
                <BoxStaker
                  node={node}
                  letture={dati}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {dati && node?.state === 'off' && (
                <BoxStaker
                  node={node}
                  letture={dati}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {dati &&
                (node?.state === 'alert-ready' ||
                  node?.state === 'alert-running') && (
                  <BoxAlert
                    node={node}
                    letture={dati}
                  />
                )}
              {(node?.state === 'alert-ready' ||
                node?.state === 'alert-running') &&
                node?.unhandledAlertIDs.length && (
                  <BoxConfirm alertID={node.unhandledAlertIDs[0]} />
                )}
            </>
          ) : (
            <Loader
              immagineLoader={'/images/cont.svg'}
              number={4}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoxDati;
