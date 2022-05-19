import React from 'react'
import style from './modali.module.css'
import { ShareContext } from '../../../context/context'
import { useContext } from 'react'
import { Button, CloseIcon } from '../../ui/ui'
import { motion, AnimatePresence } from 'framer-motion'

function BoxConfirm() {
    const share = useContext(ShareContext)

    return (
        <AnimatePresence>
       {share.confirm && <motion.div
            className={style.boxConfirm}
            initial={{ opacity: 0, top: 20  }}
             animate={{ opacity: 1, top: 0 }}
             exit={{ opacity: 0, top:20 }}
             transition={{ duration: .5 }}
        >
            <div>

                <div className={style.wrapperCloseIcon} >
                    <CloseIcon onClick={() => share.setConfirm(false)} />
                </div>

                <div className={style.statoModaleTitolo}>{
                    // Se esiste una corrispondenza tra uiStatosensore e confrim, stampa, altrimenti stampa confirm
                    share.uiStatiSensore[share.confirm] ?
                        share.uiStatiSensore[share.confirm] :
                        share.confirm
                }</div>
                {share.confirm === 'alert' && <div className={style.testoConferma}>
                    Vuoi confermare lo stop?
                    <Button type="alert">Conferma</Button>
                </div>}

            </div>
        </motion.div>}
        </AnimatePresence>
    )
}

export default BoxConfirm