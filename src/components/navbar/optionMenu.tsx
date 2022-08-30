import React, { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { CloseIcon } from '../ui/ui';
import style from './navbar.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { IUserContext } from '../../context/user-context';

type Props = {
  userSharedData: IUserContext;
  openSettings: boolean;
  setOpenSettings: Dispatch<SetStateAction<boolean>>;
};

function OptionMenu({ userSharedData, setOpenSettings, openSettings }: Props) {
  return (
    <>
      <AnimatePresence>
        {openSettings && (
          <motion.div
            className={`${style.drawer} ${style.options}`}
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: 0 }}
            exit={{ opacity: 0, right: -200 }}
            transition={{ duration: 0.5 }}
          >
            <div className={style.wrappericon}>
              <CloseIcon
                size={40}
                onClick={() => setOpenSettings(false)}
              />
            </div>
            <div className={style.wrapperInnerOptions}>
              <label htmlFor="org">{"Seleziona l'organizzazione"}</label>
              <Select
                name="org"
                options={userSharedData.orgOptions}
                value={userSharedData.selectedOrg}
                onChange={(option) => {
                  if (!option) return;
                  userSharedData.setSelectedOrg(option);
                }}
                isDisabled={userSharedData.orgOptions.length < 2}
              />
              <label htmlFor="app">{"Seleziona l'applicazione"}</label>
              <Select
                name="app"
                options={userSharedData.appOptions}
                value={userSharedData.selectedApp}
                onChange={(option) => {
                  if (!option) return;
                  userSharedData.setSelectedApp(option);
                }}
                isDisabled={userSharedData.appOptions.length < 2}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default OptionMenu;
