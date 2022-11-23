import React, { FC } from 'react';
import style from './boxDati.module.scss';
import BoxDefault from './boxDefault';
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import Loader from '../loaders/loader';
import StakerDefaultData from '../../typings/defaultData';
import Node from '../../typings/node';

type Props = {
  datiDefault?: StakerDefaultData;
  node?: Node;
};

const BoxDatiDefault: FC<Props> = ({ datiDefault, node }) => {
  const animationControls = useAnimation();

  const share = useContext(ShareContext);

  return (
    <AnimatePresence>
      <motion.div
        animate={animationControls}
        className={` ${style.boxDati} ${node ? style[node.state] : ''} ${
          share.confirmState ? style.modalOpen : ''
        }`}
      >
        {datiDefault ? (
          <>
            <BoxDefault datiDefault={datiDefault} />
          </>
        ) : (
          <Loader
            immagineLoader={'/images/cont.svg'}
            number={4}
            text="loading data"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default BoxDatiDefault;
