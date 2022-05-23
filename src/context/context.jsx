import React, { createContext, useState } from "react"

const ShareContext = createContext();



function ShareContextProvider({children}) {

    const [confirmModal, setConfirmModal] = useState(false) 
    const [alertData, setAlertData] = useState({})

    const uiStatiSensore = {
        ok: 'sensore funzionante',
        rec: 'in stato di rilevamento',
        off: 'sensore non funzionante',
        alert: 'rilevata anomalia'
    }



      const shareData ={
        confirm: confirmModal,
        setConfirm: setConfirmModal,
        uiStatiSensore: uiStatiSensore,
        alertData: alertData,
        setAlertData: setAlertData
    }

    return (
    <ShareContext.Provider value={shareData}>
      {children}
    </ShareContext.Provider>
  )
}

export  {ShareContextProvider, ShareContext}