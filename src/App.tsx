import React, { useState, useEffect, useContext, useCallback, FC } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
import { UserContext } from './context/user-context';
import './App.scss';
import Node from './typings/node';
import StakerDefaultData from './typings/defaultData';
import BoxDati from './components/boxdati/boxDati';
import BoxDatiDefault from './components/boxdati/boxDatiDefault';
import useMediaQuery from './hooks/useMediaQuery';
import './components/ui/ui.scss';

const Dashboard = lazy(() => import('./components/dashboard/dashboard'));

const App: FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [stakerClicked, setStakerClicked] = useState<number>(-1);

  const userSharedData = useContext(UserContext);
  const [isConnected, setIsConnected] = useState(
    userSharedData.socket?.connected
  );

  const isMobile = useMediaQuery('(max-width: 760px)');

  useEffect(() => {
    userSharedData.socket?.on('connect', () => {
      setIsConnected(true);
      console.log(isConnected);
    });

    userSharedData.socket?.on('disconnect', () => {
      setIsConnected(false);
      console.log(isConnected);
    });

    return () => {
      userSharedData.socket?.off('connect');
      userSharedData.socket?.off('disconnect');
    };
  }, [isConnected]);

  const getData = useCallback(() => {
    const func = async () => {
      if (userSharedData.selectedApp?.value === undefined) return;

      console.log('[INFO] fetching data');
      const nodes = await userSharedData.getNodes();
      setNodes(nodes);
    };

    func();
  }, [userSharedData.selectedApp?.value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => getData(), [userSharedData.selectedApp?.value, getData]);

  useEffect(() => {
    userSharedData.socket?.on('change-node', () => {
      console.log('[SocketIO] Detected change');
      getData();
    });

    return () => {
      userSharedData.socket?.off('change-node');
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
                  node={stakerClicked !== -1 ? nodes[stakerClicked] : undefined}
                />
                {!isMobile && <BoxDatiDefault datiDefault={datiDefault()} />}{' '}
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
