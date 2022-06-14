import React, { useState } from 'react'
import style from './boxDati.module.scss'
import { RiTerminalFill } from "react-icons/ri";
import { motion } from "framer-motion"



function StatoSensore({ statoSensore }) {

    const uiStatiSensore = {
        ok: 'sensore funzionante',
        rec: 'in stato di rilevamento...',
        off: 'sensore non funzionante',
        alert: 'rilevata anomalia'
    }




    return (
        <div className={`${style.stato}`}>
            <div className={style.iconastato}>
                {statoSensore === 'rec' ?
                    <div className={style.iconastatoRec}>
                        <div className={style.lancia}></div>
                        <img src={`images/${statoSensore}-led.svg`} alt="icona ok" />
                    </div> :
                    <img src={`images/${statoSensore}-led.svg`} alt="icona ok" />
                }
            </div>
            <div className={`${style.datiStato} ${style[statoSensore]}`}>
                <div className={style.label}>{statoSensore}</div>
                <div className={style.datoLabel}><RiTerminalFill />{uiStatiSensore[statoSensore]}</div>
            </div>
        </div>
    )
}

function BloccoNumerico({ datiNumerici, code, index }) {

    return (
        <>
            <motion.div
                key={code}
                className={style.bloccoDati}
                initial={{ opacity: 0, top: 20 }}
                animate={{ opacity: 1, top: 0 }}
                exit={{ opacity: 0, top: 20 }}
                transition={{ duration: .5, delay: index * 0.1 }}
            >
                <div className={style.titoloInterno}>{datiNumerici.titolo}</div>
                <div className={style.datoInterno}>{datiNumerici.dato} <span>%</span></div>
            </motion.div>
        </>
    )
}

function BtnStartRec() {

    const [statoInvioDati, setStatoInvioDati] = useState(false)

    function iniziaLettura() {

        const dataPost = {
            statoStaker: 1
        }

        setStatoInvioDati(true)

        fetch('http://localhost:5001', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataPost)
        }).then(() => {
            console.log('stato aggiornato');
            setStatoInvioDati(false)
        }).catch(error => {

            console.error('ORRORE ED ERRORE, QUALCUNO MI AIUTI...', error);
        });
    }

    return (
        <div className={style.wrapperbutton}>
            <button disabled={statoInvioDati} onClick={() => iniziaLettura()}>
                {!statoInvioDati ?
                    "Inizia rilevamento" :
                    "...rilevamento in corso"
                }
            </button>
        </div>
    )
}

/* COMPONENTE PRINCIPALE */

function BoxStaker({ dati }) {
    return (

        <motion.header
            key={dati?.code}
            initial={{ opacity: 0, top: 20, position: 'relative' }}
            animate={{ opacity: 1, top: 0, position: 'relative' }}
            exit={{ opacity: 0, top: 20 }}
            transition={{ duration: .5 }}
        >
            <div className={style.title}>
                <div className={style.titoletto}>Reach Staker</div>
                <div className={style.codiceStaker}>{dati?.code}</div>
            </div>

            <StatoSensore statoSensore={dati?.state} />
            {dati?.state === 'ok' &&
                <BtnStartRec />
            }
            <div className={style.datiInterni}>
                {dati?.datiInterni?.map((item, index) =>
                    <React.Fragment key={item.titolo}>
                        <BloccoNumerico datiNumerici={item} code={dati.code} index={index} />
                    </React.Fragment >
                )}
            </div>
        </motion.header>

    )
}

export default BoxStaker