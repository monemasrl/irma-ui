import React, { FC, useEffect } from 'react';
import style from './boxDati.module.scss';
import BoxDefault from './boxDefault';
import BoxStaker from './boxStaker';
import BoxAlert from './boxAlert';
import BoxConfirm from './modali/boxConfirm';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import Loader from '../loaders/loader';
import Reading from '../../typings/reading';
import StakerDefaultData from '../../typings/defaultData';
import Node from '../../typings/node';

type Props = {
  dati?: Reading[];
  datiDefault?: StakerDefaultData;
  node?: Node;
  stakerClicked: number;
};

const BoxDati: FC<Props> = ({ datiDefault, dati, stakerClicked, node }) => {
  const animationControls = useAnimation();

  async function sequence() {
    console.log('stakerClicked', stakerClicked);
    if (stakerClicked !== -1) {
      await animationControls.start({ opacity: 1 });
      animationControls.start({
        scale: 1,
        x: -5,
        transition: {
          ease: 'easeInOut',
          duration: 0.5,
        },
      });
    } else {
      await animationControls.start({ opacity: 1 });
      animationControls.start({
        scale: 0.95,
        x: -20,
        transition: {
          ease: 'easeInOut',
          duration: 0.5,
        },
      });
    }
  }

  const share = useContext(ShareContext);

  useEffect(() => {
    sequence();
  }, [stakerClicked]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log('dati', dati);

  return (
    <AnimatePresence>
      <motion.div
        animate={animationControls}
        className={`${style.boxDati} ${node ? style[node.state] : ''} ${
          share.confirmState ? style.modalOpen : ''
        }`}
      >
        {datiDefault ? (
          <>
            {' '}
            {node?.state === 'ok' && <BoxStaker dati={dati} />}
            {node?.state === 'rec' && <BoxStaker dati={dati} />}
            {node?.state === 'off' && <BoxStaker dati={dati} />}
            {stakerClicked === -1 && <BoxDefault datiDefault={datiDefault} />}
            {(node?.state === 'alert-ready' ||
              node?.state === 'alert-running') && <BoxAlert dati={dati} />}
            {(node?.state === 'alert-ready' ||
              node?.state === 'alert-running') &&
              node?.unhandledAlertIDs.length && (
                <BoxConfirm alertID={dati.unhandledAlertIDs[0]} />
              )}
          </>
        ) : (
          <Loader
            immagineLoader={'/images/cont.svg'}
            number={4}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default BoxDati;
