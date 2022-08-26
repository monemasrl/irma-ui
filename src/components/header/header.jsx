import React, { useContext } from 'react';
import style from './header.module.scss';
import Navbar from '../navbar/navbar';
import { UserContext } from '../../context/user-context';

function Header() {
  const userSharedData = useContext(UserContext);

  return (
    <header className={style.header}>
      <div className={style.wrapperInnerHader}>
        <div className={style.wrapperlogo}>
          <img
            className={style.logo}
            src="/images/logo.svg"
            alt="logo"
          />
        </div>
        <div className={style.header_text}>
          <div className={style.org}>
            <span>Organizzazione:</span> {userSharedData.selectedOrg?.label}
          </div>
          <div className={style.app}>
            <span>Applicazione:</span> {userSharedData.selectedApp?.label}
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
