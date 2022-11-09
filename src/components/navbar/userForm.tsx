import React, { FC, Dispatch, SetStateAction } from 'react';
import User from '../../typings/user';
import { CloseIcon } from '../ui/ui';
import style from './navbar.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { UserRegistrationForm } from '../form/user';
type Props = {
  idUtente: string;
  userList?: User[];
  userData?: User;
  setFormUser: Dispatch<SetStateAction<boolean>>;
  formUser: boolean;
};
const UserForm: FC<Props> = ({ formUser, setFormUser, idUtente, userList }) => {
  const datiUtentePerForm = userList?.filter((item) => item.id === idUtente)[0];
  console.log(datiUtentePerForm);

  return (
    <AnimatePresence>
      {formUser && (
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
              onClick={() => setFormUser(false)}
            />
          </div>
          {idUtente ? <h1>Modifica Utente</h1> : <h1>Aggiungi Utente</h1>}
          <div>
            <UserRegistrationForm datiUtentePerForm={datiUtentePerForm} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default UserForm;
