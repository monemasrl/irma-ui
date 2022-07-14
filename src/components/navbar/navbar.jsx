import React, { useState, useContext } from 'react'
import Select from 'react-select';
import style from './navbar.module.scss'
import { FiUser } from 'react-icons/fi'
import { CloseIcon } from '../ui/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { UserContext } from '../../context/user-context';
import AuthService from '../../services/auth.service';

const datiUser = {
    nome: 'carlo',
    cognome: 'martello',
    qualifica: 'Re',
    accesso: 'amministratore',
    tempoSessioneCorrente: 360,
}

function Navbar() {

    const [openMenu, setOpenMenu] = useState(false)

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
            </div>
            <AnimatePresence>
                {openMenu && <motion.div
                    className={style.drawer}
                    initial={{ opacity: 0, right: -200 }}
                    animate={{ opacity: 1, right: 0 }}
                    exit={{ opacity: 0, right: -200 }}
                    transition={{ duration: .5 }}
                >
                    <div className={style.wrappericon} onClick={() => setOpenMenu(false)}>
                        <CloseIcon size={40} />
                    </div>
                    <div className={style.wrapperDatiUser}>
                        <div className={style.avatar}>
                            <img src="/images/fake_1.jpeg" alt="avatar-carlo-martello" />
                        </div>
                        <ul className={style.datiutente}>
                            <li><span>Nome:</span> {datiUser.nome}</li>
                            <li><span>Cognome:</span> {datiUser.cognome}</li>
                            <li><span>Qualifica:</span> {datiUser.qualifica}</li>
                            <li><span>User Tipo:</span> {datiUser.accesso}</li>
                            <li><span>Durata sessione:</span> {datiUser.tempoSessioneCorrente / 60} ore</li>
                            <li className={style.logout}>Logout</li>
                        </ul>
                    </div>
                    <div className={style.wrapperLink}>
                        <ul className={style.datiLink}>
                            <li>tutorial</li>
                            <li>Condizioni di utilizzo</li>
                            <li>Assistenza</li>
                        </ul>
                    </div>
                    <button onClick={logout}>Logout</button>
                    <Select
                        options={userSharedData.orgOptions}
                        defaultValue={userSharedData.orgOptions.length ? userSharedData.orgOptions[0] : {}}
                        onChange={(option) => userSharedData.setSelectedOrgID(option.value)}
                        isDisabled={userSharedData.orgOptions.length < 2}
                    />
                    <Select
                        options={userSharedData.appOptions}
                        defaultValue={userSharedData.appOptions.length ? userSharedData.appOptions[0] : {}}
                        onChange={(option) => userSharedData.setSelectedAppID(option.value)}
                        isDisabled={userSharedData.appOptions.length < 2}
                    />
                </motion.div>}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
