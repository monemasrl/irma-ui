import React, { useContext } from 'react'
import style from './header.module.css'
import Navbar from '../navbar/navbar'
import { UserContext } from '../../context/user-context';

function Header() {

    const userSharedData = useContext(UserContext);

    return (
        <header className={style.header}>
            <div className={style.wrapperlogo}>
                <img className={style.logo} src="/images/logo.svg" alt="logo" />
                {/* <div className={style.header_text}>{userSharedData.selectedApp.label}</div> */}
            </div>
            <Navbar />
        </header>
    )
}

export default Header
