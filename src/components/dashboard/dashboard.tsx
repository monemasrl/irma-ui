import React, { FC } from 'react';
import style from './dashboard.module.scss';
import BtnStaker from '../btn/btnStaker';
import { IoApps, IoListOutline } from 'react-icons/io5';
import Loader from '../loaders/loader';
import { Reading } from '../../services/microservice.service';

type Props = {
  isAlert: boolean;
  datiOrdinatiLista: Reading[];
  stakerClicked: number;
  setStakerClicked: (a: number) => void;
  listview: boolean;
  setListView: (a: boolean) => void;
};

const Dashboard: FC<Props> = ({
  isAlert,
  datiOrdinatiLista,
  stakerClicked,
  setStakerClicked,
  listview,
  setListView,
}) => {
  const immagineLoader = '/images/cont.svg';

  function switchVisualizzaLista(switchList: boolean) {
    setListView(switchList);
    setStakerClicked(-1);
  }

  return (
    <div
      className={`${style.dashboard} ${isAlert ? style.alert : ' '} ${
        listview ? style['lista'] : ' '
      }`}
    >
      <div className={style.switcherList}>
        {listview ? (
          <span onClick={() => switchVisualizzaLista(false)}>
            <IoApps />
          </span>
        ) : (
          <span onClick={() => switchVisualizzaLista(true)}>
            <IoListOutline />
          </span>
        )}
      </div>
      {datiOrdinatiLista ? (
        datiOrdinatiLista.map((item, index) => {
          return (
            <BtnStaker
              key={item.sensorID}
              state={item.state}
              code={item.sensorName}
              index={index}
              setStakerClicked={setStakerClicked}
              stakerClicked={stakerClicked}
              listview={listview}
            />
          );
        })
      ) : (
        <Loader
          immagineLoader={immagineLoader}
          number={4}
        />
      )}
    </div>
  );
};

export default Dashboard;
