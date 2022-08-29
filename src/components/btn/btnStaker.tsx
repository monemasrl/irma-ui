import React, { FC } from 'react';
import style from './btn.module.scss';
import greenLed from '../../assets/images/ok-led.svg';
import recordingLed from '../../assets/images/rec-led.svg';
import offLed from '../../assets/images/off-led.svg';
import alertLed from '../../assets/images/alert-led.svg';
import alertSymbol from '../../assets/images/alert-symbol.svg';
import SensorState from '../../utils/sensorState';

type LedProps = {
  state: SensorState;
};

const Led: FC<LedProps> = ({ state }) => {
  if (state === 'ok') {
    return (
      <div className={`${style.led} ${style.ok} `}>
        <img
          className={style.led}
          src={greenLed}
          alt="green led"
        />
      </div>
    );
  } else if (state === 'rec') {
    return (
      <div className={`${style.led} ${style.rec}`}>
        <img
          src={recordingLed}
          alt="green led"
        />
        <div className={style.lancia}></div>
      </div>
    );
  } else if (state === 'off') {
    return (
      <div className={`${style.led} ${style.off}`}>
        <img
          className={`${style.led} ${style.off}`}
          src={offLed}
          alt="green led"
        />
      </div>
    );
  } else if (state === 'alert') {
    return (
      <div className={style.led}>
        <div className={style.circleAlert}></div>
        <img
          className={`${style.led} ${style.alert}`}
          src={alertLed}
          alt="green led"
        />
        <img
          className={style.alertSymbol}
          src={alertSymbol}
          alt="green led"
        />
      </div>
    );
  }
  return <></>;
};

// TODO: remove any
type BtnStakerProps = {
  state: SensorState;
  code: string;
  setStakerClicked: (a: any) => void;
  index: number;
  stakerClicked: any;
  listview: boolean;
};

const BtnStaker: FC<BtnStakerProps> = ({
  state,
  code,
  setStakerClicked,
  index,
  stakerClicked,
  listview,
}) => {
  function pulsanteCliccato() {
    if (stakerClicked === index) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: remove any
  function settaStatiOnClick() {
    setStakerClicked((prevIndex: any) => (prevIndex === index ? false : index));
  }

  const codeSubstring = code.slice(0, 8);

  return (
    <div
      onClick={() => settaStatiOnClick()}
      className={`
          ${style.btnbox} 
          ${style[state]} 
          ${pulsanteCliccato() ? style.btnOn : ''}
          ${listview ? style['lista'] : ''}
          `}
    >
      <div className={style.innerBtnBox}>
        <div className={style.ledOut}>
          <Led state={state} />
        </div>
        <div className={style.codeName}>{codeSubstring}</div>
      </div>
    </div>
  );
};

export default BtnStaker;