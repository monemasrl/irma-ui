import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import style from './navbar.module.scss'
import { FiUser } from 'react-icons/fi'
import { CloseIcon } from '../ui/ui'
import { motion, AnimatePresence } from 'framer-motion'
import ChirpStack from '../../services/chirpstack-api.service';
import AuthService from '../../services/auth.service';

const datiUser = {
    nome: 'carlo',
    cognome: 'martello',
    qualifica: 'Re',
    accesso: 'amministratore',
    tempoSessioneCorrente: 360,
}

function Navbar({ logoutFunction }) {

    const [openMenu, setOpenMenu] = useState(false)
    const [orgOptions, setOrgOptions] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(-1);
    const [appOptions, setAppOptions] = useState([]);
    const [selectedApp, setSelectedApp] = useState(-1);

    useEffect(() => {
      ChirpStack.getOrganizationsList(AuthService.getUserData())
        .then((list) => {
          let options = list.map(({id, displayName}) => ({
            value: id,
            label: displayName
          }));
          setOrgOptions(options);
        });
    }, []);

    useEffect(() => {
      setSelectedOrg(orgOptions.length ? orgOptions[0].value : -1);
    }, [orgOptions]);

    useEffect(() => {
      ChirpStack.getApplicationList(AuthService.getUserData(), selectedOrg)
        .then((list) => {
          let options = list.map(({id, name}) => ({
            value: id,
            label: name
          }));
          setAppOptions(options);
        });
    }, [selectedOrg]);

    useEffect(() => {
      setSelectedApp(appOptions.length ? appOptions[0].value : -1);
    }, [appOptions]);


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
                    <button onClick={logoutFunction}>Logout</button>
                    <Select
                        options={orgOptions}
                        defaultValue={orgOptions.length ? orgOptions[0] : {}}
                        onChange={(option) => setSelectedOrg(option.value)}
                    />
                    <Select
                        options={appOptions}
                        defaultValue={appOptions.length ? appOptions[0] : {}}
                        onChange={(option) => setSelectedApp(option.value)}
                    />
                </motion.div>}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
