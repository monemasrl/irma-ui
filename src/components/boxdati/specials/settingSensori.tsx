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
    <motion.section
      className={style.settingSensore}
      variants={variants}
      animate={open ? 'open' : 'close'}
      transition={{
        duration: 0.5,
        default: { ease: 'easeInOut' },
      }}
    >
      <button
        className={style.settingSensoriBtn}
        onClick={(prev) => setOpen(!prev)}
      >
        <FiSettings />
      </button>
    </motion.section>
  );
};

export default SettingSensori;
