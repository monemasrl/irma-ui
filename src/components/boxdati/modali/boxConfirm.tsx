import React, { FC } from 'react';
import '../../ui/ui.css';
import style from './modali.module.css';
import { ShareContext } from '../../../context/context';
import { useContext } from 'react';
import { CloseIcon } from '../../ui/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { FormAlert } from '../../form/form';

type Props = {
  alertID: string;
};

const BoxConfirm: FC<Props> = ({ alertID }) => {
  const share = useContext(ShareContext);

  return (
    <AnimatePresence>
      {share.confirmState && (
        <motion.div
          key={share.confirmState}
          className={`${style.boxConfirm} ${style[share.confirmState]}`}
          initial={{ opacity: 0, top: 20, backgroundColor: '#ee2e32' }}
          animate={{ opacity: 1, top: 0, backgroundColor: '#ee2e32' }}
          exit={{ opacity: 0, top: 20, backgroundColor: '#ee2e32' }}
          transition={{ duration: 0.5 }}
        >
          <div className={style.innerWrapper}>
            <div className={style.wrapperCloseIcon}>
              <CloseIcon onClick={() => share.setConfirmState(undefined)} />
            </div>

            <div className={style.statoModaleTitolo}>
              {
                // Se esiste una corrispondenza tra uiStatosensore e confrim, stampa, altrimenti stampa confirm
                share.uiStatiSensore[share.confirmState]
                  ? share.uiStatiSensore[share.confirmState]
                  : share.confirmState
              }
            </div>
            {share.confirmState === 'alert' && (
              <>
                <div className={style.testoConferma}>
                  Confermi la segnalazione?
                </div>
                <FormAlert alertID={alertID} />
              </>
            )}
          </div>
          <img
            className={style.backConfirm}
            src="/images/back-confirm-alert.svg"
            alt="back confirm alert"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoxConfirm;
