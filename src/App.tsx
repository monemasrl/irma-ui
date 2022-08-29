import React, { useState, useEffect, useContext, useCallback, FC } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
import { UserContext } from './context/user-context';
import './App.scss';
import io from 'socket.io-client';
import { Reading } from './services/microservice.service';
import { AppOption } from './mock/mock_data';

const Dashboard = lazy(() => import('./components/dashboard/dashboard'));
const BoxDati = lazy(() => import('./components/boxdati/boxDati'));

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost';
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || '5000';

const DISABLE_SOCKETIO = process.env.REACT_APP_DISABLE_SOCKETIO || 0;
const MOCK_SENSORDATA = process.env.REACT_APP_MOCK_SENSORDATA || 0;

const socket = !DISABLE_SOCKETIO
  ? io(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}`)
  : undefined;

console.log(WEBSOCKET_URL, WEBSOCKET_PORT, socket);

export type StakerDefaultData = {
  numeroStaker: number;
  oreOperativeTotali: number;
  allerteAttuali: number;
};

const App: FC = () => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [readingsOrdinate, setReadingsOrdinate] = useState<Reading[]>([]);

  const [stakerClicked, setStakerClicked] = useState(-1);
  const [listview, setListView] = useState(false);
  const [isConnected, setIsConnected] = useState(socket?.connected);
  const userSharedData = useContext(UserContext);

  useEffect(() => {
    socket?.on('connect', () => {
      setIsConnected(true);
      console.log(isConnected);
    });

    socket?.on('disconnect', () => {
      setIsConnected(false);
      console.log(isConnected);
    });

    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
    };
  }, [isConnected]);

  const getData = useCallback(() => {
    const func = async () => {
      if (userSharedData.selectedApp?.value === undefined) return;
      console.log('[INFO] fetching data');

      if (MOCK_SENSORDATA) {
        const MockData = (await import('./mock/mock_data.json')).default;

        const readings =
          MockData['sensorData'][userSharedData.selectedApp.value as AppOption];

        setReadings(readings as Reading[]);
        return;
      }

      const list = await userSharedData.getSensors();

      console.log('sensors', list);

      const sensorIDList = list.map(({ sensorID }) => sensorID);

      const readings = await userSharedData.getReadings(sensorIDList);

      setReadings(readings);
    };

    func();
  }, [userSharedData.selectedApp?.value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket?.on('change', () => {
      console.log('[SocketIO] Detected change');
      getData();
    });

    return () => {
      socket?.off('change');
    };
  }, [getData]);

  useEffect(() => getData(), [userSharedData.selectedApp?.value, getData]);

  useEffect(() => {
    const newdati = readings;
    if (readings && listview) {
      console.log('test', newdati);
      //Per portare in cima gli alert
      const datiOrdinatiAlert = newdati.sort((a, _b) => {
        if (a.state === 'alert') {
          return -1;
        }
        return 0;
      });
      setReadingsOrdinate(datiOrdinatiAlert);
    } else if (readings && !listview) {
      setReadingsOrdinate(newdati);
    } else {
      setReadingsOrdinate([]);
    }
  }, [readings, listview]);

  function isAlert() {
    // controlla se c'è un alert nell'array in entrata
    const alert = readings.filter((item) => item.state === 'alert').length;
    if (alert >= 1) {
      return true;
    } else {
      return false;
    }
  }

  function datiDefault() {
    if (readings) {
      let ore = readings
        .map((item) => item.datiInterni[0].dato)
        .reduce((prev, item) => prev + item);
      ore = Math.round((ore + Number.EPSILON) * 100) / 100;

      const allerte = readings.filter((item) => item.state === 'alert').length;

      const dati: StakerDefaultData = {
        numeroStaker: readings.length,
        oreOperativeTotali: ore,
        allerteAttuali: allerte,
      };
      return dati;
    }
  }

  return (
    <ShareContextProvider>
      <div className={`App ${isAlert() && 'alert'}`}>
        <Header />
        <ShareContext.Consumer>
          {(share) => (
            <main>
              <div className="wrapper-content">
                <div
                  className={`wrapper-sx ${
                    share.confirmState ? 'modalOpen' : ''
                  }`}
                >
                  <Suspense fallback={<Loaderdash />}>
                    <Dashboard
                      listview={listview}
                      setListView={setListView}
                      isAlert={isAlert()}
                      datiOrdinatiLista={readingsOrdinate}
                      stakerClicked={stakerClicked}
                      setStakerClicked={setStakerClicked}
                    />
                  </Suspense>
                  <Footer />
                </div>

                <BoxDati
                  stakerClicked={stakerClicked}
                  datiDefault={datiDefault()}
                  dati={
                    stakerClicked !== -1
                      ? readingsOrdinate[stakerClicked]
                      : undefined
                  }
                />
              </div>
            </main>
          )}
        </ShareContext.Consumer>

        {isAlert() ? (
          <div className="back-alert">
            <img
              src="/images/backalert.svg"
              alt="backalert"
            />
            <img
              src="/images/back-default.svg"
              alt="backalert"
            />
          </div>
        ) : (
          <div className="back-default">
            <img
              src="/images/back-default.svg"
              alt="backalert"
            />
            <img
              src="/images/back-default.svg"
              alt="backalert"
            />
          </div>
        )}
      </div>
    </ShareContextProvider>
  );
};

export default App;
