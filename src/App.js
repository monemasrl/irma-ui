import './App.css';
import {useState, useEffect} from 'react'
import Dashboard from './components/dashboard/dashboard';
import BoxDati from './components/boxdati/boxDati';
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
      <div className='wrapper-content'>
        <Dashboard data={data} stakerClicked = {stakerClicked} setStakerClicked={setStakerClicked}  />
        <BoxDati stakerClicked={stakerClicked} dati = {data.data ? data.data[stakerClicked] : {}} />
      </div>
    </div>
  );
}

export default App;
