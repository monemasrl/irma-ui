import React, { useState, useContext } from 'react';
import style from './navbar.module.scss';
import { FiUser, FiSettings } from 'react-icons/fi';
import { UserContext } from '../../context/user-context';
import UserMenu from './userMenu';
import OptionMenu from './optionMenu';

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

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
    </nav>
  );
}

export default Navbar;
