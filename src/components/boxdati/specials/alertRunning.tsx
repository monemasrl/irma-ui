import React, { FC } from 'react';
import style from './alertRunning.module.scss';

const AlertRunning: FC = () => {
  return (
    <div className={style.wrapperAlertRunningImage}>
      <img
        className={style.imageback}
        src={`images/alert-back.svg`}
        alt="icona alert"
      />
      <div className={style.wrapperAim}>
        <img
          className={style.aim1}
          src={`images/alert-running1.svg`}
          alt="icona alert "
        />
        <img
          className={style.aim2}
          src={`images/alert-running2.svg`}
          alt="icona alert"
        />
      </div>
    </div>
  );
};

export default AlertRunning;
