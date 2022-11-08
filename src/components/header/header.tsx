import React, { useContext, FC, useEffect, useState } from 'react';
import style from './header.module.scss';
import Navbar from '../navbar/navbar';
import { IUserContext, UserContext } from '../../context/user-context';
import User from '../../typings/user';

const Header: FC = () => {
  const userSharedData = useContext<IUserContext>(UserContext);
  const [userList, setUserList] = useState<User[]>();
  const [userData, setUserData] = useState<User>();
  console.log('userlist', userList);
  console.log('userlist', userData);

  //Accesso alla lista utenti
  useEffect(() => {
    userSharedData.getUserList().then((item) => setUserList(item));
    setUserData(userSharedData.user);
  }, [userSharedData]); // eslint-disable-line react-hooks/exhaustive-deps
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
      <Navbar
        userList={userList}
        userData={userData}
      />
    </header>
  );
};

export default Header;
