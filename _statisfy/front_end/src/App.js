import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([{}]);

  useEffect( () => {
    fetch("/api/user/9875").then(
      res => res.json()
    ).then(
        data => {
          setData(data)
          console.log(data)
        }
    )
  }
  , [])

  return (
    <div className="App">
      {
          (typeof data.user === "undefined") ? (
            <p>loading data...</p>
          ) : ( 
            data.user.username
          )
        }
    </div>
  );
}

export default App;
