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
  const [userList, setUserList] = useState<User[]>([]);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

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
                setSelectedUser(undefined);
                setUserFormOpen(true);
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
                        setSelectedUser(item);
                        setUserFormOpen(true);
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
        selectedUser={selectedUser}
        userFormOpen={userFormOpen}
        setUserFormOpen={setUserFormOpen}
      />
    </>
  );
};

export default UserList;
