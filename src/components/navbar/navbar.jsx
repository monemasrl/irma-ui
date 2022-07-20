import React, { useState, useContext } from 'react'
import style from './navbar.module.scss'
import { FiUser, FiSettings } from 'react-icons/fi'
import { UserContext } from '../../context/user-context';
import AuthService from '../../services/auth.service';
import UserMenu from './userMenu';
import OptionMenu from './optionMenu';

const datiUser = {
    nome: 'carlo',
    cognome: 'martello',
    qualifica: 'Re',
    accesso: 'amministratore',
    tempoSessioneCorrente: 360,
}

function Navbar() {

    const [openMenu, setOpenMenu] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)

    const userSharedData = useContext(UserContext);

    const logout = () => {
        AuthService.logout();
        userSharedData.setToken(null);
    }

    return (
        <nav>
            <div className={style.burger}>
                <div className={style.svg} onClick={() => setOpenMenu(true)}>
                    <FiUser />
                </div>
                <div className={style.svg} onClick={() => setOpenSettings(true)}>
                    <FiSettings />
                </div>
            </div>
        
            <UserMenu logout={logout} openMenu={openMenu} setOpenMenu={setOpenMenu} datiUser={datiUser} />
            <OptionMenu openSettings={openSettings} setOpenSettings={setOpenSettings} userSharedData={userSharedData} />
         </nav>
    )
}

export default Navbar
