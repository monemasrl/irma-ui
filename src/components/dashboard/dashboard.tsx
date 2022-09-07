import React, { Dispatch, FC, SetStateAction } from 'react';
import style from './dashboard.module.scss';
import BtnStaker from '../btn/btnStaker';
import { IoApps, IoListOutline } from 'react-icons/io5';
import Loader from '../loaders/loader';
import Node from '../../typings/node';

type Props = {
  isAlert: boolean;
  nodiOrdinati: Node[];
  stakerClicked: number;
  setStakerClicked: Dispatch<SetStateAction<number>>;
  listview: boolean;
  setListView: Dispatch<SetStateAction<boolean>>;
};

const Dashboard: FC<Props> = ({
  isAlert,
  nodiOrdinati,
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
      {nodiOrdinati.length ? (
        nodiOrdinati.map((item, index) => {
          return (
            <BtnStaker
              key={item.nodeID}
              state={item.state}
              code={item.nodeName}
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
