import { useState, useEffect, useContext, useCallback } from 'react'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
import { UserContext } from './context/user-context';
import './App.scss';
import io from 'socket.io-client';
import Microservice from './services/microservice.service';

const Dashboard = lazy(() => import('./components/dashboard/dashboard'))
const BoxDati = lazy(() => import('./components/boxdati/boxDati'))

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "http://localhost"
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || "5000"

const socket = io(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}`);
console.log('WEBSOCKET_URL',WEBSOCKET_PORT );
function App() {
  const [data, setData] = useState(false);
  const [stakerClicked, setStakerClicked] = useState(false);
  const [listview, setListView] = useState(false)
  const [datiOrdinatiLista, setDatiOrdinatiLista] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected);
  const userSharedData = useContext(UserContext);
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log(isConnected);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log(isConnected);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('change');
    };
  }, [isConnected]);

  const getData = useCallback(() => {
    console.log("UserSharedData", userSharedData)
    if (userSharedData.selectedApp?.value === undefined) return;
    console.log("[INFO] fetching data")

    Microservice.getSensors(userSharedData.token, userSharedData.selectedApp.value)
      .then((list) => {
        console.log('sensors', list)

        const sensorIDList = list.map(({sensorID}) => sensorID);

        const dataPost = {
          paths: sensorIDList,
        }

        fetch(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/`
          , {
            method :'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Access-Control-Allow-Origin":`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/`
            },
            body: JSON.stringify(dataPost),
          }
        )
          .then(function (response) {
            console.log('readings', response);

            return response.json()
          })
          .then(function (myJson) {

            setData(myJson)
          });
      });
  }, [userSharedData]);

  useEffect(() => {
    socket.on('change', () => {
      console.log("[SocketIO] Detected change")
      getData();
    });

    return () => {
      socket.off('change');
    };
  }, [getData]);

  useEffect(() => getData(), [userSharedData.selectedApp, getData]);
  

  useEffect(() => {
    const newdati = data && [...data?.data]
    if (data && listview) {
        console.log('test', newdati);
        //Per portare in cima gli alert
        const datiOrdinatiAlert = newdati.sort((a, b) => {
            if (a.state === 'alert') { return -1; }
            return 0;
        })
        setDatiOrdinatiLista(datiOrdinatiAlert)
    } else if (data && !listview) {
        setDatiOrdinatiLista(newdati)
    }

}, [data, listview])


  function isAlert() {
    // controlla se c'è un alert nell'array in entrata
    const alert = data?.data?.filter((item) => item.state === 'alert').length
    if (alert >= 1) {
      return true
    } else { return false }
  }

  function datiDefault() {
    if (data) {
      let ore = data.data.map((item) => item.datiInterni[0].dato)
      ore = ore.reduce((prev, item) => prev + item)

      let allerte = data.data.filter((item) => item.state === 'alert').length

      const dati = {
        numeroStaker: data.data.length,
        oreOperativeTotali: ore,
        allerteAttuali: allerte
      }
      return dati
    }
  }

  return (
    <ShareContextProvider>
      <div className={`App ${isAlert() && 'alert'}`}>
        <Header />
        <ShareContext.Consumer>
          {(share) => (
            <main>
              <div className='wrapper-content'>
                <div className={`wrapper-sx ${share.confirm ? 'modalOpen':''}`}>
                  <Suspense fallback={<Loaderdash />}>              
                   <Dashboard  listview = {listview} setListView = {setListView} isAlert={isAlert()} datiOrdinatiLista={datiOrdinatiLista} stakerClicked={stakerClicked} setStakerClicked={setStakerClicked} />
                  </Suspense>
                  <Footer />
                </div>
              
                  <BoxDati stakerClicked={stakerClicked} datiDefault={datiDefault()} dati={datiOrdinatiLista ? datiOrdinatiLista[stakerClicked] : {}} />
               
              </div>
            </main>
            )}
        </ShareContext.Consumer>
        
        {isAlert() ?
          <div className="back-alert">
            <img src="/images/backalert.svg" alt="backalert" />
            <img src="/images/back-default.svg" alt="backalert" />
          </div> : 
          <div className="back-default">
          <img src="/images/back-default.svg" alt="backalert" />
          <img src="/images/back-default.svg" alt="backalert" />
        </div>
        
        }
          
      </div>
    </ShareContextProvider>
  );
}

export default App;
