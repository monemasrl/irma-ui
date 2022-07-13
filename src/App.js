import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import Loaderbox from './components/loaders/loaderbox';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
import './App.scss';
import io from 'socket.io-client';
import AuthService from './services/auth.service';

const Dashboard = lazy(() => import('./components/dashboard/dashboard'))
const BoxDati = lazy(() => import('./components/boxdati/boxDati'))

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "http://localhost"
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || "5000"

const socket = io(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}`);

function App() {
  const [data, setData] = useState(false);
  const [stakerClicked, setStakerClicked] = useState(false);
  const [listview, setListView] = useState(false)
  const [datiOrdinatiLista, setDatiOrdinatiLista] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userData, setUserData] = useState(AuthService.getUserData());
  const navigate = useNavigate();
  
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('change', () => {
      getData();
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('change');
    };
  }, []);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const logout = () => {
    AuthService.logout();
    setUserData(null);
  }

  const getData = () => {
    fetch(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/`
      , {
        method :'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {


        return response.json()
      })
      .then(function (myJson) {

        setData(myJson)
      });
  }
  

  useEffect(() => {
    const newdati = data && [...data?.data]
    if (data && listview) {
        console.log('test', newdati);
        const datiOrdinatiAlert = newdati.sort((a, b) => {
            if (a.state === 'alert') { return -1; }
            return 0;
        })
        setDatiOrdinatiLista(datiOrdinatiAlert)
    } else if (data && !listview) {
        setDatiOrdinatiLista(newdati)
    }

}, [data, listview])

  useEffect(() => {
    getData()
  }, [])

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
              <button onClick={logout}>Logout</button>
              <div className='wrapper-content'>
                <div className={`wrapper-sx ${share.confirm ? 'modalOpen':''}`}>
                  <Suspense fallback={<Loaderdash />}>              
                  <Dashboard  listview = {listview} setListView = {setListView} isAlert={isAlert()} datiOrdinatiLista={datiOrdinatiLista} stakerClicked={stakerClicked} setStakerClicked={setStakerClicked} />
                  </Suspense>
                  <Footer />
                </div>
                <Suspense fallback={<Loaderbox />}>
                  <BoxDati stakerClicked={stakerClicked} datiDefault={datiDefault()} dati={datiOrdinatiLista ? datiOrdinatiLista[stakerClicked] : {}} />
                </Suspense>
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
