import React from 'react'
import style from './boxDati.module.css'
import { RiTerminalFill } from "react-icons/ri";

function StatoSensore({ statoSensore }) {
    const uiStatiSensore = {
        ok: 'sensore funzionante',
        rec: 'in stato di rilevamento',
        off: 'sensore non funzionante',
        alert: 'rilevata anomalia'
    }
    return (
        <div className={`${style.stato}`}>
            <div className={style.iconastato}>
                <img src={`images/${statoSensore}-led.svg`} alt="icona ok" />
            </div>
            <div className={`${style.datiStato} ${style[statoSensore]}`}>
                <div className={style.label}>{statoSensore}</div>
                <div className={style.datoLabel}><RiTerminalFill />{uiStatiSensore[statoSensore]}</div>
            </div>
        </div>
    )
}
function BoxAlert({ dati }) {
    return (
        <header>
            <div className={style.title}>
                <div className={style.titoletto}>Reach Staker</div>
                <div className={style.codiceStaker}>{dati?.code}</div>
            </div>
            <div className={style.subData}>
                <StatoSensore statoSensore={dati?.state} />
            </div>
            <div className={style.wrapperAlert}>
                <img src="/images/alert-back.svg" alt="back alert" />
            </div>
            <button className={style.buttonStop}>Stop Allarme</button>

            <div className={style.boxconfirm}>
                <div className={style.boxconfirmText}>Confermi la segnalazione?</div>
                <div className={style.boxconfirmbtn}>
                    <button>si</button>
                    <button>no</button>
                </div>
            </div>
        </header>
    )
}

export default BoxAlert