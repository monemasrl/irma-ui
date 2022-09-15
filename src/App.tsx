import React, { useState, useEffect, useContext, useCallback, FC } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
import { UserContext } from './context/user-context';
import './App.scss';
import io from 'socket.io-client';
import { TotalReading, WindowReading } from './typings/reading';
import Node from './typings/node';
import StakerDefaultData from './typings/defaultData';
import BoxDati from './components/boxdati/boxDati';
import BoxDatiDefault from './components/boxdati/boxDatiDefault';
import './components/ui/ui.scss';
const Dashboard = lazy(() => import('./components/dashboard/dashboard'));

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost';
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || '5000';

const DISABLE_SOCKETIO = process.env.REACT_APP_DISABLE_SOCKETIO || 0;

const socket = !DISABLE_SOCKETIO
  ? io(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}`)
  : undefined;

console.log(WEBSOCKET_URL, WEBSOCKET_PORT, socket);

const App: FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [totalReadings, setTotalReadings] = useState<TotalReading[]>([]);
  const [windowReadings, setWindowReadings] = useState<WindowReading[]>([]);

  const [stakerClicked, setStakerClicked] = useState<number>(-1);
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
      const nodes = await userSharedData.getNodes();
      setNodes(nodes);

      const nodeIDList = nodes.map(({ nodeID }) => nodeID);
      const totReads = await userSharedData.getTotalReadings(nodeIDList);
      setTotalReadings(totReads);
      const winReads = await userSharedData.getWindowReadings(nodeIDList);
      setWindowReadings(winReads);
    };

    func();
  }, [userSharedData.selectedApp?.value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => getData(), [userSharedData.selectedApp?.value, getData]);

  useEffect(() => {
    socket?.on('change', () => {
      console.log('[SocketIO] Detected change');
      getData();
    });

    return () => {
      socket?.off('change');
    };
  }, [getData]);

  // controlla se c'è un alert nell'array in entrata
  const isAlert = () =>
    nodes.some(
      (item) => item.state === 'alert-ready' || item.state === 'alert-running'
    );

  const datiDefault = () => {
    if (!nodes.length) return undefined;

    const allerte = nodes.filter(
      (item) => item.state === 'alert-ready' || item.state === 'alert-running'
    ).length;

    const dati: StakerDefaultData = {
      numeroStaker: nodes.length,
      allerteAttuali: allerte,
    };
    return dati;
  };

  const getNodeTotalReadings = (node: Node) =>
    totalReadings.filter((r) => r.nodeID === node.nodeID);

  const getNodeWindowReadings = (node: Node) =>
    windowReadings.filter((r) => r.nodeID === node.nodeID);

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
                      isAlert={isAlert()}
                      nodes={nodes}
                      stakerClicked={stakerClicked}
                      setStakerClicked={setStakerClicked}
                    />
                  </Suspense>
                  <Footer />
                </div>

                <BoxDati
                  isAlert={isAlert()}
                  stakerClicked={stakerClicked}
                  setStakerClicked={setStakerClicked}
                  totalReadings={
                    stakerClicked !== -1
                      ? getNodeTotalReadings(nodes[stakerClicked])
                      : undefined
                  }
                  windowReadings={
                    stakerClicked !== -1
                      ? getNodeWindowReadings(nodes[stakerClicked])
                      : undefined
                  }
                  node={stakerClicked !== -1 ? nodes[stakerClicked] : undefined}
                />

                <BoxDatiDefault datiDefault={datiDefault()} />
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
