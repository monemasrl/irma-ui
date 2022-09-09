import React, { useState, useEffect, useContext, useCallback, FC } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
import { UserContext } from './context/user-context';
import './App.scss';
import io from 'socket.io-client';
import { AppOption } from './mock/mock_data';
import Reading from './typings/reading';
import Node from './typings/node';
import StakerDefaultData from './typings/defaultData';
import BoxDati from './components/boxdati/boxDati';
import BoxDatiDefault from './components/boxdati/boxDatiDefault';

const Dashboard = lazy(() => import('./components/dashboard/dashboard'));

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost';
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || '5000';

const DISABLE_SOCKETIO = process.env.REACT_APP_DISABLE_SOCKETIO || 0;
const MOCK_DATA = process.env.REACT_APP_MOCK_DATA || 0;

const socket = !DISABLE_SOCKETIO
  ? io(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}`)
  : undefined;

console.log(WEBSOCKET_URL, WEBSOCKET_PORT, socket);

const App: FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [nodiOrdinati, setNodiOrdinati] = useState<Node[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

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

      if (MOCK_DATA) {
        const MockNodes = (await import('./mock/mock_nodes.json')).default;
        const MockReadings = (await import('./mock/mock_readings.json'))
          .default;

        const nodesMock =
          MockNodes[userSharedData.selectedApp.value as AppOption];

        setNodes(nodesMock as Node[]);

        const readingsMock = MockReadings;

        setReadings(readingsMock as Reading[]);
        return;
      }

      const nodes = await userSharedData.getNodes();
      setNodes(nodes);
      console.log('nodes', nodes);

      const nodeIDList = nodes.map(({ nodeID }) => nodeID);

      const readings = await userSharedData.getReadings(nodeIDList);

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
    if (nodes.length && listview) {
      console.log('test', nodes);
      //Per portare in cima gli alert
      const nodiOrdinatiAlert = nodes.sort((a, _b) => {
        if (a.state === 'alert-ready' || a.state === 'alert-running') {
          return -1;
        }
        return 0;
      });
      setNodiOrdinati(nodiOrdinatiAlert);
    } else if (nodes.length && !listview) {
      setNodiOrdinati(nodes);
    } else {
      setNodiOrdinati([]);
    }
  }, [nodes, listview]);

  function isAlert() {
    // controlla se c'è un alert nell'array in entrata
    return nodes.some(
      (item) => item.state === 'alert-ready' || item.state === 'alert-running'
    );
  }

  function datiDefault() {
    if (!nodes.length) return undefined;

    const allerte = nodes.filter(
      (item) => item.state === 'alert-ready' || item.state === 'alert-running'
    ).length;

    const dati: StakerDefaultData = {
      numeroStaker: nodes.length,
      allerteAttuali: allerte,
    };
    return dati;
  }

  const getNodeReadings = (node: Node) => {
    const list = readings.filter((r) => r.nodeID === node.nodeID);
    return list;
  };

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
                      nodiOrdinati={nodiOrdinati}
                      stakerClicked={stakerClicked}
                      setStakerClicked={setStakerClicked}
                    />
                  </Suspense>
                  <Footer />
                </div>

                <BoxDati
                  stakerClicked={stakerClicked}
                  dati={
                    stakerClicked !== -1
                      ? getNodeReadings(nodiOrdinati[stakerClicked])
                      : undefined
                  }
                  node={
                    stakerClicked !== -1
                      ? nodiOrdinati[stakerClicked]
                      : undefined
                  }
                />

                <BoxDatiDefault
                  stakerClicked={stakerClicked}
                  datiDefault={datiDefault()}
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
