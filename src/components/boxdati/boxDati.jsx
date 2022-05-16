import React from 'react'
import { useState, useEffect } from 'react'
import style from './boxDati.module.css'
import iconaOk from '../../assets/images/green-led.svg'
import { motion, AnimatePresence } from "framer-motion"

function StatoOk() {
  return (
    <div className={`${style.stato}`}>
      <div className={style.iconastato}>
        <img src={iconaOk} alt="icona ok" />
      </div>
      <div className={style.datiStato}>
        <div className={style.label}>OK</div>
        <div className={style.datoLabel}>(sensore funzionante)</div>
      </div>
    </div>
  )
}

function BloccoNumerico({ datiNumerici, code, index }) {
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    setAnimate(false) 

    setTimeout(() => {
      setAnimate(true)
    }, 700)

  }, [code])

  return (
    <>
      
  <motion.div
          key={code}
          className={style.bloccoDati}
          initial={{ opacity: 0, top:50 }}
          animate={{ opacity: 1, top:0 }}
          exit={{ opacity: 0, top: 50  }}
          transition={{duration:.6, delay: index * 0.1}}
        >
          <div className={style.titoloInterno}>{datiNumerici.titolo}</div>
          <div className={style.datoInterno}>{datiNumerici.dato} <span>%</span></div>
        </motion.div>
     
    </>
  )
}

function BoxDati({ dati }) {
  return (
    <div className={`${style.boxDati}`}>
      <header>
        <div className={style.title}>
          <div className={style.titoletto}>Reach Staker</div>
          <div className={style.codiceStaker}>{dati?.code}</div>
        </div>
        <div className={style.subData}>
          <StatoOk />
        </div>
        <div className={style.datiInterni}>
          {dati?.datiInterni?.map((item, index) =>

            <React.Fragment key={item.titolo}>
              <BloccoNumerico datiNumerici={item} code={dati.code} index={index} />
            </React.Fragment >

          )}
        </div>
      </header>
    </div>
  )
}

export default BoxDati