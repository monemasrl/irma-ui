import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import User from '../../typings/user';
import style from './navbar.module.scss';
import { FiEdit } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from '../ui/ui';
import UserForm from './userForm';
type Props = {
  userList?: User[];
  userData?: User;
  setOpenLista: Dispatch<SetStateAction<boolean>>;
  openLista: boolean;
};
const UserList: FC<Props> = ({
  userList,
  openLista,
  setOpenLista,
  userData,
}) => {
  const [formUser, setFormUser] = useState(false);

  return (
    <>
      {' '}
      <AnimatePresence>
        {openLista && (
          <motion.div
            className={`${style.drawer} ${style.wrapperUserList}`}
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, right: -200 }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.wrappericon}>
              <CloseIcon
                size={40}
                onClick={() => setOpenLista(false)}
              />
            </div>
            <button
              className="addUser"
              onClick={() => setFormUser(true)}
            >
              Aggiungi utente
            </button>
            <h3>Lista utenti</h3>
            <ul className={style.listaUtenti}>
              {userList?.map((item) => {
                return (
                  <li key={item.id}>
                    <span>
                      <FiEdit />
                    </span>
                    {item.first_name} {item.last_name}{' '}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <UserForm
        userList={userList}
        userData={userData}
        formUser={formUser}
        setFormUser={setFormUser}
      />
    </>
  );
};

export default UserList;
