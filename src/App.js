import './App.css';
import {useState, useEffect} from 'react'
import Dashboard from './components/dashboard/dashboard';
import BoxDati from './components/boxdati/boxDati';
import Header from './components/header/header';
import Footer from './components/footer/footer';
function App() {
  const [data,setData]=useState([]);
  const [stakerClicked, setStakerClicked] = useState(false);

  const getData=()=>{
    fetch('./data/data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
     
        return response.json();
      })
      .then(function(myJson) {
        
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="App">
      <main>
        <Header />
        <div className='wrapper-content'>

          <div>
            <Dashboard data={data} stakerClicked = {stakerClicked} setStakerClicked={setStakerClicked}  />
            <Footer />
          </div>
          <BoxDati stakerClicked={stakerClicked} dati = {data.data ? data.data[stakerClicked] : {}} />
        </div>
      
      </main>
    </div>
  );
}

export default App;
