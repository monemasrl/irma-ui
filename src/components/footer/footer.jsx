import React from 'react'
import style from './footer.module.css'
function Footer() {
  return (
    <div>
            <ul className={style.legenda}>
                <li><img src={`images/ok-led.svg`} alt="icona ok" /><span>Sensore Funzionante</span></li>
                <li><img src={`images/rec-led.svg`} alt="icona ok" /><span>In Stato Di Rilevamento</span></li>
                <li><img src={`images/off-led.svg`} alt="icona ok" /><span>Sensore Non Funzionante</span></li>
                <li><img src={`images/alert-led.svg`} alt="icona ok" /><span>Rilevata Anomalia</span></li>
            
            </ul>
    </div>
  )
}

export default Footer