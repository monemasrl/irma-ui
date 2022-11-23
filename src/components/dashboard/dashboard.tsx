import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import style from './dashboard.module.scss';
import BtnStaker from '../btn/btnStaker';
import { IoApps, IoListOutline } from 'react-icons/io5';
import Loader from '../loaders/loader';
import Node from '../../typings/node';
import useMediaQuery from '../../hooks/useMediaQuery';

type Props = {
  isAlert: boolean;
  nodes: Node[];
  stakerClicked: number;
  setStakerClicked: Dispatch<SetStateAction<number>>;
};

const Dashboard: FC<Props> = ({
  isAlert,
  nodes,
  stakerClicked,
  setStakerClicked,
}) => {
  const [listview, setListView] = useState(false);
  const isMobile = useMediaQuery('(max-width: 760px)');
  const immagineLoader = '/images/cont.svg';
  useEffect(() => {
    isMobile ? setListView(true) : setListView(false);
  }, [isMobile]);
  function switchVisualizzaLista(switchList: boolean) {
    setListView(switchList);
    setStakerClicked(-1);
  }

  const nodiOrdinati = (nodes: Node[], listview: boolean) => {
    if (!nodes.length) return [];

    if (listview) {
      // Per portare in cima gli alert in modalita lista

      const nodiOrdinatiAlert = nodes.sort((a, _b) => {
        if (a.state === 'alert-ready' || a.state === 'alert-running') {
          return -1;
        }
        return 0;
      });
      return nodiOrdinatiAlert;
    }

    // Per ordinare i dati per ID quando non in lista
    const nodiOrdinatiID = nodes.sort((a, b) => {
      if (a.nodeID < b.nodeID) return -1;
      if (a.nodeID > b.nodeID) return 1;
      return 0;
    });
    return nodiOrdinatiID;
  };

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
      {nodes.length ? (
        nodiOrdinati(nodes, listview).map((item, index) => {
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
          text="loading data"
        />
      )}
    </div>
  );
};

export default Dashboard;
