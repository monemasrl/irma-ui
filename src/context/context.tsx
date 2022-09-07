import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { NodeState } from '../typings/node';

interface IUiStatiSensore {
  [key: string]: string;
}

interface IShareData {
  confirmState?: NodeState;
  setConfirmState: Dispatch<SetStateAction<NodeState | undefined>>;
  uiStatiSensore: IUiStatiSensore;
}

const ShareContext = createContext<IShareData>({} as IShareData);

type Props = {
  children: ReactNode;
};

function ShareContextProvider({ children }: Props) {
  const [confirmModal, setConfirmModal] = useState<NodeState | undefined>(
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
