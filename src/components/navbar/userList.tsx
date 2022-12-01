import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from 'react';
import User from '../../typings/user';
import style from './navbar.module.scss';
import { FiEdit } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from '../ui/ui';
import UserForm from './userForm';
import { IUserContext, UserContext } from '../../context/user-context';

type Props = {
  setOpenLista: Dispatch<SetStateAction<boolean>>;
  openLista: boolean;
};

const UserList: FC<Props> = ({ openLista, setOpenLista }) => {
  const userSharedData = useContext<IUserContext>(UserContext);
  const [userList, setUserList] = useState<User[]>();
  const [formUser, setFormUser] = useState(false);
  const [idUtente, setIdUtente] = useState('');

  useEffect(() => {
    userSharedData.getUserList().then((item) => setUserList(item));
  }, [userSharedData]);

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
              onClick={() => {
                setFormUser(true);
                setIdUtente('');
              }}
            >
              Aggiungi utente
            </button>
            <h3>Lista utenti</h3>
            <ul className={style.listaUtenti}>
              {userList?.map((item) => {
                return (
                  <li key={item.id}>
                    <span
                      onClick={() => {
                        setIdUtente(item.id);
                        setFormUser(true);
                      }}
                    >
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
        idUtente={idUtente}
        userList={userList}
        userData={userSharedData.user}
        formUser={formUser}
        setFormUser={setFormUser}
      />
    </>
  );
};

export default UserList;
