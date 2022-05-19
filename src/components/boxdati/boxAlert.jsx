import React from 'react'
import style from './boxDati.module.css'
import { RiTerminalFill } from "react-icons/ri";
import { ShareContext } from '../../context/context';
import { useContext } from 'react';
import { Button } from '../ui/ui';

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
    console.log(share.confirm);
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
            <div className={style.buttonWrapper}>
                <Button type="alert-big" onClick={() => share.setConfirm(dati?.state)}>Stop Allarme</Button>
            </div>

            <div className={style.boxconfirm}>
                <div className={style.boxconfirmText}>Confermi la segnalazione?</div>
                <div className={style.boxconfirmbtn}>
                    <Button type="alert">si</Button>
                    <Button type="alert">no</Button>
                </div>
            </div>
        </header>
    )
}

export default BoxAlert