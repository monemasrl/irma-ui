import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  immagineLoader: string;
  number: number;
  text?: string;
};

function Loader({ immagineLoader, number, text }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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

  function createLoaderItem(immagine: string, number: number) {
    const itemNumber = new Array(number).fill(undefined);
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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="loader-generico"
    >
      <h3>{text}</h3>
      {createLoaderItem(immagineLoader, number)}
    </motion.div>
  );
}

export default Loader;
