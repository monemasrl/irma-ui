import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loaderdash from './components/loaders/loaderdash';
import Loaderbox from './components/loaders/loaderbox';
import { lazy, Suspense } from 'react';
import { ShareContextProvider, ShareContext } from './context/context';
const Dashboard = lazy(() => import('./components/dashboard/dashboard'))
const BoxDati = lazy(() => import('./components/boxdati/boxDati'))



function App(props) {
  const [data, setData] = useState(false);
  const [stakerClicked, setStakerClicked] = useState(false);


  const getData = () => {
    fetch('./data/data.json'
      , {
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
              <div className='wrapper-content'>
                <div className={`wrapper-sx ${share.confirm ? 'modalOpen':''}`}>
                  <Suspense fallback={<Loaderdash />}>              
                  <Dashboard isAlert={isAlert()} data={data} stakerClicked={stakerClicked} setStakerClicked={setStakerClicked} />
                  </Suspense>
                  <Footer />
                </div>
                <Suspense fallback={<Loaderbox />}>
                  <BoxDati stakerClicked={stakerClicked} datiDefault={datiDefault()} dati={data.data ? data.data[stakerClicked] : {}} />
                </Suspense>
              </div>
            </main>
            )}

        </ShareContext.Consumer>
        
        {isAlert() &&
          <div className="back-alert">
            <img src="/images/backalert.svg" alt="backalert" />
          </div>}
      </div>
    </ShareContextProvider>
  );
}

export default App;
