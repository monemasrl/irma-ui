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

type Props = {
  dati?: Reading;
  datiDefault?: StakerDefaultData;
  stakerClicked: number;
};

const BoxDati: FC<Props> = ({ datiDefault, dati, stakerClicked }) => {
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
        className={`${style.boxDati} ${dati ? style[dati.state] : ''} ${
          share.confirmState ? style.modalOpen : ''
        }`}
      >
        {datiDefault ? (
          <>
            {' '}
            {dati?.state === 'ok' && <BoxStaker dati={dati} />}
            {dati?.state === 'rec' && <BoxStaker dati={dati} />}
            {dati?.state === 'off' && <BoxStaker dati={dati} />}
            {stakerClicked === -1 && <BoxDefault datiDefault={datiDefault} />}
            {(dati?.state === 'alert-ready' ||
              dati?.state === 'alert-running') && <BoxAlert dati={dati} />}
            {(dati?.state === 'alert-ready' ||
              dati?.state === 'alert-running') &&
              dati?.unhandledAlertIDs.length && (
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
