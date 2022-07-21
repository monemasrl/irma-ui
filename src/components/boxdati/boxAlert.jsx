import React from 'react'
import style from './boxDati.module.scss'
import { RiTerminalFill } from "react-icons/ri";
import { ShareContext } from '../../context/context';
import { useContext } from 'react';


function StatoSensore({ statoSensore }) {
    const share = useContext(ShareContext)

    return (
        <div className={`${style.stato}`}>
            <div className={style.iconastato}>
                <img src={`images/${statoSensore}-led.svg`} alt="icona ok" />
            </div>
            <div className={`${style.datiStato} ${style[statoSensore]}`}>
                <div className={style.label}>{statoSensore}</div>
                <div className={style.datoLabel}><RiTerminalFill />{share.uiStatiSensore[statoSensore]}</div>
            </div>
        </div>
    )
}
function BoxAlert({ dati }) {
    const share = useContext(ShareContext)
    return (
        <header>
            <div className={style.title}>
                <div className={style.titoletto}>Reach Staker</div>
                <div className={style.codiceStaker}>{dati?.sensorName}</div>
            </div>
            <div className={style.subData}>
                <StatoSensore statoSensore={dati?.state} />
            </div>
            <div className={style.wrapperAlert}>
                <img src="/images/alert-back.svg" alt="back alert" />
            </div>
            <div className={style.buttonWrapper}>
                <button className="alert" onClick={() => share.setConfirm(dati?.state)}>Gestisci Allerta</button>
            </div>

 
        </header>
    )
}

export default BoxAlert
