import React, { createContext, ReactNode, useState } from 'react';

interface IUiStatiSensore {
  [key: string]: string;
}

interface IShareData {
  confirm: boolean;
  setConfirm: (a: boolean) => void;
  uiStatiSensore: IUiStatiSensore;
}

// TODO: fix default value
const ShareContext = createContext<IShareData>(undefined!);

type Props = {
  children: ReactNode;
};

function ShareContextProvider({ children }: Props) {
  const [confirmModal, setConfirmModal] = useState(false);

  const uiStatiSensore: IUiStatiSensore = {
    ok: 'sensore funzionante',
    rec: 'in stato di rilevamento',
    off: 'sensore non funzionante',
    alert: 'rilevata anomalia',
  };

  const shareData: IShareData = {
    confirm: confirmModal,
    setConfirm: setConfirmModal,
    uiStatiSensore: uiStatiSensore,
  };

  return (
    <ShareContext.Provider value={shareData}>{children}</ShareContext.Provider>
  );
}

export { ShareContextProvider, ShareContext };
