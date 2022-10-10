import React, { FC, useState, useEffect } from 'react';
// import { parseUnixTimestamp } from '../../../utils/parseDate';
import style from './timer.module.scss';
type props = {
  dateTimer?: number;
};
const Timer: FC<props> = ({ dateTimer }) => {
  const [timer, setTimer] = useState<Date>();

  useEffect(() => {
    if (dateTimer) {
      const dateNow = new Date().valueOf();
      setInterval(() => {
        const diff = new Date((Math.floor(dateNow / 1000) - dateTimer) * 1000);
        setTimer(diff);
      }, 4000);
    }
  }, []);
  console.log(timer);

  return (
    <div className={style.timer}>
      {timer?.getHours()}:{timer?.getMinutes()}:{timer?.getSeconds()}
    </div>
  );
};

export default Timer;
