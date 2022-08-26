import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './navbar.module.scss';
import { CloseIcon } from '../ui/ui';
import { IDatiUser } from './navbar';

type Props = {
  datiUser: IDatiUser;
  openMenu: boolean;
  setOpenMenu: (a: boolean) => void;
  logout: () => void;
};

function UserMenu({ openMenu, datiUser, setOpenMenu, logout }: Props) {
  return (
    <>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className={style.drawer}
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, right: -200 }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.wrappericon}>
              <CloseIcon
                size={40}
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <div className={style.wrapperDatiUser}>
              <div className={style.avatar}>
                <img
                  src="/images/fake_1.jpeg"
                  alt="avatar-carlo-martello"
                />
              </div>
              <ul className={style.datiutente}>
                <li>
                  <span>Nome:</span> {datiUser.nome}
                </li>
                <li>
                  <span>Cognome:</span> {datiUser.cognome}
                </li>
                <li>
                  <span>Qualifica:</span> {datiUser.qualifica}
                </li>
                <li>
                  <span>User Tipo:</span> {datiUser.accesso}
                </li>
                <li>
                  <span>Durata sessione:</span>{' '}
                  {datiUser.tempoSessioneCorrente / 60} ore
                </li>
                <li
                  className={style.logout}
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
            <div className={style.wrapperLink}>
              <ul className={style.datiLink}>
                <li>tutorial</li>
                <li>Condizioni di utilizzo</li>
                <li>Assistenza</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserMenu;
