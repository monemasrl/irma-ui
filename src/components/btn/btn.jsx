import React from 'react'
import style from './btn.module.css'
import greenLed from '../../assets/images/green-led.svg'
import recordingLed from '../../assets/images/recording-led.svg'
import offLed from '../../assets/images/off-led.svg'
import alertLed from '../../assets/images/alert-led.svg'
import alertSymbol from '../../assets/images/alert-symbol.svg'


function Led({ state }) {


  if (state === 'ok') {
    return (
      <div className={`${style.led} ${style.ok} `}>
        <img className={style.led} src={greenLed} alt="green led" />
      </div>)
  } else if (state === 'rec') {
    return (
      <div className={`${style.led} ${style.rec}`}>
        <img src={recordingLed} alt="green led" />
        <div className={style.lancia}></div>
      </div>)
  } else if (state === 'off') {
    return (
      <div className={`${style.led} ${style.off}`}>
        <img className={`${style.led} ${style.off}`} src={offLed} alt="green led" />
      </div>
    )
  } else if (state === 'alert') {
    return ( 
    <div className={style.led}>
      <div className={style.circleAlert}></div>
      <img className={`${style.led} ${style.alert}`} src={alertLed} alt="green led" />
      <img className={style.alertSymbol} src={alertSymbol} alt="green led" />
    </div>)
  } 
}

function Btn({ state = 'ok', code = 'AA003', setBtnClick, index, active }) {
 
  
  return (
    <div  onClick={()=>setBtnClick((prevIndex)=>prevIndex===index ? false : index)} 
          className={`
          ${style.btnbox} 
          ${(state === 'alert') && style.alert} 
          ${active ? style.btnOn : ''}
          `}>
    <div className={style.innerBtnBox}>
      <div className={style.ledOut}>
        <Led state={state} />
      </div>
      <div className={style.codeName}>{code}</div>
    </div>
    </div>
  )
}

export default Btn