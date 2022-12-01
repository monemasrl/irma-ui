import React, { FC, Dispatch, SetStateAction } from 'react';
import User from '../../typings/user';
import { CloseIcon } from '../ui/ui';
import style from './navbar.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { UserRegistrationForm } from '../form/user';

type Props = {
  selectedUser?: User;
  setUserFormOpen: Dispatch<SetStateAction<boolean>>;
  userFormOpen: boolean;
};

const UserForm: FC<Props> = ({
  userFormOpen,
  setUserFormOpen,
  selectedUser,
}) => {
  console.log(selectedUser);

  return (
    <AnimatePresence>
      {userFormOpen && (
        <motion.div
          className={style.drawer}
          initial={{ opacity: 0, right: -200 }}
          animate={{ opacity: 1, right: 0 }}
          exit={{ opacity: 0, right: -200 }}
          transition={{ duration: 0.5 }}
        >
          {' '}
          <div className={style.wrappericon}>
            <CloseIcon
              size={40}
              onClick={() => setUserFormOpen(false)}
            />
          </div>
          {selectedUser ? <h1>Modifica Utente</h1> : <h1>Aggiungi Utente</h1>}
          <div>
            <UserRegistrationForm selectedUser={selectedUser} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default UserForm;
