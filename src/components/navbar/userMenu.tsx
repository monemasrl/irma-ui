import React, { Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './navbar.module.scss';
import { CloseIcon } from '../ui/ui';
import User from '../../typings/user';

type Props = {
  user?: User;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
};

function UserMenu({ openMenu, user, setOpenMenu, logout }: Props) {
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
                  src="/images/empty_propic.png"
                  alt="profile-picture"
                />
              </div>
              {user && (
                <ul className={style.datiutente}>
                  <li>
                    <span>Nome:</span> {user.first_name}
                  </li>
                  <li>
                    <span>Cognome:</span> {user.last_name}
                  </li>
                  <li>
                    <span>Email:</span> {user.email}
                  </li>
                  <li>
                    <span>Ruolo:</span> {user.role}
                  </li>
                  <li
                    className={style.logout}
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              )}
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
