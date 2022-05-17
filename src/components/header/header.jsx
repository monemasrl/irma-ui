import React from 'react'
import style from './header.module.css'

function Header() {
    return (
        <header className={style.header}>
            <img className={style.logo} src="/images/logo.svg" alt="logo" />
        </header>
    )
}

export default Header