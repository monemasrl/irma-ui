import React from 'react'
import style from './boxDati.module.css'
import BoxDefault from './boxDefault';
import BoxStaker from './boxStaker';
import BoxAlert from './boxAlert';


function BoxDati({ datiDefault, dati, stakerClicked }) {

  return (
    <div className={`${style.boxDati} ${style[dati?.state]}`}>
      
  
        {dati?.state === 'ok'  && <BoxStaker dati={dati && dati}/>}

        {dati?.state === 'rec'  && <BoxStaker dati={dati && dati}/>}
        
        {dati?.state === 'off'  && <BoxStaker dati={dati && dati}/>}
         
        {stakerClicked === false &&<BoxDefault datiDefault={datiDefault && datiDefault}  />}
  
        {dati?.state === 'alert' && <BoxAlert dati={dati && dati} />}
    
    </div>
  )
}

export default BoxDati