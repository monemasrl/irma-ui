import React, { FC, SetStateAction, Dispatch } from 'react';
import style from './boxDati.module.scss';
import BoxStaker from './boxStaker';
import BoxAlert from './boxAlert';
import BoxConfirm from './modali/boxConfirm';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../loaders/loader';
import Node from '../../typings/node';

type Props = {
  node?: Node;
  stakerClicked: number;
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const BoxDati: FC<Props> = ({ setStakerClicked, stakerClicked, node }) => {
  const share = useContext(ShareContext);

  const variants = {
    initial: { opacity: 0, y: -200 },
    animate: { opacity: 1, y: -50 },
    exit: { opacity: 0, y: -200 },
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
          {node ? (
            <>
              {' '}
              {node.state === 'ok' && (
                <BoxStaker
                  node={node}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {node.state === 'rec' && (
                <BoxStaker
                  node={node}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {node.state === 'off' && (
                <BoxStaker
                  node={node}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {(node.state === 'alert-ready' ||
                node.state === 'alert-running') && (
                <BoxAlert
                  node={node}
                  setStakerClicked={setStakerClicked}
                />
              )}
              {(node.state === 'alert-ready' ||
                node.state === 'alert-running') &&
                node.unhandledAlertIDs.length && (
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
