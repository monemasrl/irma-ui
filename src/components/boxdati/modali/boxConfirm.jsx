import React from 'react'
import style from './modali.module.css'
import { ShareContext } from '../../../context/context'
import { useContext } from 'react'
import { CloseIcon } from '../../ui/ui'
import { motion, AnimatePresence } from 'framer-motion'
import { FormAlert } from '../../form/form'
function BoxConfirm() {
    const share = useContext(ShareContext)

    return (
        <AnimatePresence>

            {share.confirm &&
                <motion.div
                    key={share.confirm}
                    className={`${style.boxConfirm} ${style[share.confirm]}`}
                    initial={{ opacity: 0, top: 20, backgroundColor: '#ee2e32' }}
                    animate={{ opacity: 1, top: 0, backgroundColor: '#ee2e32' }}
                    exit={{ opacity: 0, top: 20, backgroundColor: '#ee2e32' }}
                    transition={{ duration: .5 }}
                >
                    <div className={style.innerWrapper}>
                        <div className={style.wrapperCloseIcon} >
                            <CloseIcon onClick={() => share.setConfirm(false)} />
                        </div>

                        <div className={style.statoModaleTitolo}>{
                            // Se esiste una corrispondenza tra uiStatosensore e confrim, stampa, altrimenti stampa confirm
                            share.uiStatiSensore[share.confirm] ?
                                share.uiStatiSensore[share.confirm] :
                                share.confirm
                        }
                        </div>
                        {share.confirm === 'alert' &&
                            <>
                                <div className={style.testoConferma}>
                                    Confermi la segnalazione?
                                </div>
                                <FormAlert />
                            </>
                        }

                    </div>
                    <img className={style.backConfirm} src="/images/back-confirm-alert.svg" alt="back confirm alert" />
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default BoxConfirm