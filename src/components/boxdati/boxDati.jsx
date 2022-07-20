import React, { useEffect } from 'react'
import style from './boxDati.module.scss'
import BoxDefault from './boxDefault';
import BoxStaker from './boxStaker';
import BoxAlert from './boxAlert';
import BoxConfirm from './modali/boxConfirm';
import { ShareContext } from '../../context/context';
import { useContext } from 'react'
import { useAnimation, motion } from 'framer-motion'

function BoxDati({ datiDefault, dati, stakerClicked }) {

  const animationControls = useAnimation();

  async function sequence() {
    console.log('stakerClicked', stakerClicked);
    if (typeof (stakerClicked) === 'number') {
      await animationControls.start({ opacity: 1 });
      animationControls.start({
        scale:1,
        x: -5,
        transition: {
          ease: "easeInOut",
          duration: .5,
          
        }
      });
    } else {
      await animationControls.start({ opacity: 1 });
      animationControls.start({
        scale:0.95,
        x: -20,
        transition: {
          ease: "easeInOut",
          duration: .5,
        }
      });
    }
  }

  const share = useContext(ShareContext)

  useEffect(() => {
    sequence();
  }, [stakerClicked]);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <motion.div
      animate={animationControls}
      className={`${style.boxDati} ${style[dati?.state]} ${share.confirm ? style.modalOpen : ''}`}>

      {dati?.state === 'ok' && <BoxStaker dati={dati && dati} />}

      {dati?.state === 'rec' && <BoxStaker dati={dati && dati} />}

      {dati?.state === 'off' && <BoxStaker dati={dati && dati} />}

      {stakerClicked === false && <BoxDefault datiDefault={datiDefault && datiDefault} />}

      {dati?.state === 'alert' && <BoxAlert dati={dati && dati} />}

      <BoxConfirm />


    </motion.div>
  )
}

export default BoxDati