import React from 'react'
import style from './boxDati.module.css'
import BoxDefault from './boxDefault';
import BoxStaker from './boxStaker';
import BoxAlert from './boxAlert';
import BoxConfirm from './modali/boxConfirm';
import { ShareContext } from '../../context/context';
import { useContext } from 'react'


function BoxDati({ datiDefault, dati, stakerClicked }) {
  const share = useContext(ShareContext)

  return (
    <div className={`${style.boxDati} ${style[dati?.state]} ${share.confirm ? style.modalOpen : ''}`}>


      {dati?.state === 'ok' && <BoxStaker dati={dati && dati} />}

      {dati?.state === 'rec' && <BoxStaker dati={dati && dati} />}

      {dati?.state === 'off' && <BoxStaker dati={dati && dati} />}

      {stakerClicked === false && <BoxDefault datiDefault={datiDefault && datiDefault} />}

      {dati?.state === 'alert' && <BoxAlert dati={dati && dati}  />}

      
     <BoxConfirm  />
      

    </div>
  )
}

export default BoxDati