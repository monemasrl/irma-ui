import React, { FC, useState, useEffect } from 'react';
// import { parseUnixTimestamp } from '../../../utils/parseDate';
import style from './timer.module.scss';
type props = {
  dateTimer?: number;
};
const Timer: FC<props> = ({ dateTimer }) => {
  const [timer, setTimer] = useState<Date>();
  const [seconds, setSeconds] = useState<number>(0);
  const dateNow = new Date().valueOf();
  setInterval(() => {
    setSeconds((prev) => prev + 1);
  }, 1000);

  if (dateTimer) {
    const diff = new Date((Math.floor(dateNow / 1000) - dateTimer) * 1000);
    useEffect(() => {
      setTimer(diff);
    }, [seconds]);
  }
  return (
    <div className={style.timer}>
      <span>
        <sup>H</sup>
        {String(timer?.getUTCHours()).padStart(2, '0')}
      </span>
      :
      <span>
        <sup>M</sup>
        {String(timer?.getUTCMinutes()).padStart(2, '0')}
      </span>
      :
      <span>
        <sup>S</sup>
        {String(timer?.getUTCSeconds()).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
