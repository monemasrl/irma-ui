import React from 'react'
import style from './boxDati.module.css'
import iconaOk from '../../assets/images/green-led.svg'

function StatoOk() {
  return (
    <div className={`${style.stato}`}>
      <div className={style.iconastato}>
        <img src={iconaOk} alt="icona ok" />
      </div>
      <div className={style.datiStato}>
        <div className={style.label}>OK</div>
        <div className={style.datoLabel}>sensore funzionante</div>
      </div>
    </div>
  )
}

function BloccoNumerico ({datiNumerici}) {
  return(
    <div className={style.bloccoDati}>
      <div className={style.titoloInterno}>{datiNumerici.titolo}</div>
      <div className={style.datoInterno}>{datiNumerici.dato}</div>
    </div>
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
   {/*      <div className={style.datiInterni}>
        {dati.datiInterni && dati.datiInterni.map((item)=> <BloccoNumerico datiNumerici ={item} />) }
        </div> */}
      </header>
    </div>
  )
}

export default BoxDati