import './App.css';
import BtnOk from './components/btn/btn';
import {useState, useEffect} from 'react'
import Dashboard from './components/dashboard/dashboard';
function App() {
  const [data,setData]=useState([]);

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
      <Dashboard data={data}/>
    </div>
  );
}

export default App;
