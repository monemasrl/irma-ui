import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShareContext = createContext();

function ShareContextProvider({ children }) {
  const [confirmModal, setConfirmModal] = useState(false);

  const uiStatiSensore = {
    ok: 'sensore funzionante',
    rec: 'in stato di rilevamento',
    off: 'sensore non funzionante',
    alert: 'rilevata anomalia',
  };

  const shareData = {
    confirm: confirmModal,
    setConfirm: setConfirmModal,
    uiStatiSensore: uiStatiSensore,
  };

  return (
    <ShareContext.Provider value={shareData}>{children}</ShareContext.Provider>
  );
}
ShareContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export { ShareContextProvider, ShareContext };
