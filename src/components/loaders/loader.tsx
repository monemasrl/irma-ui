import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  immagineLoader: string;
  number: number;
  text?: string;
  absolute?: boolean;
};

function createLoaderItem(immagine: string, number: number) {
  const itemNumber = new Array(number).fill(undefined);
  const animation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        reapeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  const y = itemNumber.map((item, index) => {
    return (
      <motion.img
        variants={animation}
        key={index}
        src={immagine}
        alt="cont loader"
        width={50}
        height={50}
      />
    );
  });
  return y;
}

function Loader({ immagineLoader, number, text, absolute }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={`wrapper-loader ${absolute && 'absolute-position'}`}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="loader-generico"
      >
        <h3>{text}</h3>
        {createLoaderItem(immagineLoader, number)}
      </motion.div>
    </div>
  );
}

export default Loader;
