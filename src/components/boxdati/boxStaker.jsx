import React, { useState, useContext } from 'react'
import style from './boxDati.module.scss'
import { RiTerminalFill } from "react-icons/ri";
import { motion } from "framer-motion"
import { UserContext } from '../../context/user-context';

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

function BloccoNumerico({ datiNumerici, sensorID, index }) {

    return (
        <>
            <motion.div
                key={sensorID}
                className={style.bloccoDati}
                initial={{ opacity: 0, top: 20 }}
                animate={{ opacity: 1, top: 0 }}
                exit={{ opacity: 0, top: 20 }}
                transition={{ duration: .5, delay: index * 0.1 }}
            >
                <div className={style.titoloInterno}>{datiNumerici.titolo}</div>
                <div className={style.datoInterno}>{datiNumerici.dato} </div>
            </motion.div>
        </>
    )
}

function BtnStartRec({ applicationID, sensorID }) {

    const [statoInvioDati, setStatoInvioDati] = useState(false)
    const userSharedData = useContext(UserContext);

    
    function iniziaLettura(applicationID, sensorID) {

        setStatoInvioDati(true)

        userSharedData.sendCommand(
            applicationID, sensorID, 0
        ).then(() => {
            console.log('stato aggiornato');
            setStatoInvioDati(false)
        }).catch(error => {
            console.error('ORRORE ED ERRORE, QUALCUNO MI AIUTI...', error);
        });
    }

    return (
        <div className={style.wrapperbutton}>
            <button disabled={statoInvioDati} onClick={() => iniziaLettura(applicationID, sensorID)}>
          Inizia Rilevamento
            </button>
        </div>
    )
}

/* COMPONENTE PRINCIPALE */

function BoxStaker({ dati }) {
    return (

        <motion.header
            key={dati?.sensorID}
            initial={{ opacity: 0, top: 20, position: 'relative' }}
            animate={{ opacity: 1, top: 0, position: 'relative' }}
            exit={{ opacity: 0, top: 20 }}
            transition={{ duration: .5 }}
        >
            <div className={style.title}>
                <div className={style.titoletto}>Reach Staker</div>
                <div className={style.codiceStaker}>{dati?.sensorName}</div>
            </div>

            <StatoSensore statoSensore={dati?.state} />
            {dati?.state === 'ok' &&
                <BtnStartRec applicationID={dati.applicationID} sensorID={dati.sensorID}/>
            }
            <div className={style.datiInterni}>
                {dati?.datiInterni?.map((item, index) =>
                    <React.Fragment key={item.titolo}>
                        <BloccoNumerico datiNumerici={item} sensorID={dati.sensorID} index={index} />
                    </React.Fragment >
                )}
            </div>
        </motion.header>

    )
}

export default BoxStaker
