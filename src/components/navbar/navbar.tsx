import React, { useState, useContext, FC } from 'react';
import style from './navbar.module.scss';
import { FiUser, FiSettings, FiList } from 'react-icons/fi';
import { UserContext } from '../../context/user-context';
import UserMenu from './userMenu';
import OptionMenu from './optionMenu';
import User from '../../typings/user';
import UserList from './userList';
type Props = {
  userList?: User[];
  userData?: User;
};
const Navbar: FC<Props> = ({ userList, userData }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openLista, setOpenLista] = useState(false);

  console.log(userList, userData);

  const userSharedData = useContext(UserContext);

  return (
    <nav>
      <div className={style.burger}>
        <div
          className={style.svg}
          onClick={() => setOpenMenu(true)}
        >
          <FiUser />
        </div>
        {userData?.role === 'admin' && (
          <div
            className={style.svg}
            onClick={() => setOpenLista(true)}
          >
            <FiList />
          </div>
        )}
        <div
          className={style.svg}
          onClick={() => setOpenSettings(true)}
        >
          <FiSettings />
        </div>
      </div>

      <UserMenu
        logout={userSharedData.logout}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        user={userSharedData.user}
      />
      <OptionMenu
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
        userSharedData={userSharedData}
      />
      <UserList
        userList={userList}
        userData={userData}
        openLista={openLista}
        setOpenLista={setOpenLista}
      />
    </nav>
  );
};

export default Navbar;
