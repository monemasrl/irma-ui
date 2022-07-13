import React from 'react'
import style from './header.module.css'
import Navbar from '../navbar/navbar'
function Header({ logoutFunction }) {
    return (
        <header className={style.header}>
            <div className={style.wrapperlogo}>
                <img className={style.logo} src="/images/logo.svg" alt="logo" />
            </div>
            <Navbar logoutFunction={logoutFunction}/>
        </header>
    )
}

export default Header
