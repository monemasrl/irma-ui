import React, { createContext, ReactNode, useState } from 'react';
import SensorState from '../utils/sensorState';

interface IUiStatiSensore {
  [key: string]: string;
}

interface IShareData {
  confirmState?: SensorState;
  setConfirmState: (a: SensorState | undefined) => void;
  uiStatiSensore: IUiStatiSensore;
}

// TODO: fix default value
const ShareContext = createContext<IShareData>(undefined!);

type Props = {
  children: ReactNode;
};

function ShareContextProvider({ children }: Props) {
  const [confirmModal, setConfirmModal] = useState<SensorState | undefined>(
    undefined
  );

  const uiStatiSensore: IUiStatiSensore = {
    ok: 'sensore funzionante',
    rec: 'in stato di rilevamento',
    off: 'sensore non funzionante',
    alert: 'rilevata anomalia',
  };

  const shareData: IShareData = {
    confirmState: confirmModal,
    setConfirmState: setConfirmModal,
    uiStatiSensore: uiStatiSensore,
  };

  return (
    <ShareContext.Provider value={shareData}>{children}</ShareContext.Provider>
  );
}

export { ShareContextProvider, ShareContext };
