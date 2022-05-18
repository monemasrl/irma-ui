import React from 'react'
import style from './header.module.css'

function Header() {
    return (
        <header className={style.header}>
            <div className={style.wrapperlogo}>
                <img className={style.logo} src="/images/logo.svg" alt="logo" />
            </div>

        </header>
    )
}

export default Header