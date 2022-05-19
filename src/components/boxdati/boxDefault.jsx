import React from 'react'
import style from './boxDati.module.css'

function BoxDefault({ datiDefault }) {
    return (
        <header>
            <ul>
                <li>
                    <div className={style.title}>
                        <div className={style.titoletto}>Reach Staker Totali</div>
                        <div className={style.codiceStaker}>{datiDefault?.numeroStaker}</div>
                    </div>
                </li>
                <li>
                    <div className={style.title}>
                        <div className={style.titoletto}>Ore operative totali</div>
                        <div className={style.codiceStaker}>{datiDefault?.oreOperativeTotali}</div>
                    </div>
                </li>
                <li>
                    <div className={style.title}>
                        <div className={style.titoletto}>Allerte</div>
                        <div className={style.codiceStaker}>{datiDefault?.allerteAttuali}</div>
                    </div>
                </li>
            </ul>
        </header>
    )
}

export default BoxDefault