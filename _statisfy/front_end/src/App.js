import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([{}]);

  useEffect( () => {
    fetch("/api").then(
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
          (typeof data.test === "undefined") ? (
            <p>loading data...</p>
          ) : ( 
            data.test.map((d, i) => (
              <p>{d}</p>
            ))
          )
        }
    </div>
  );
}

export default App;
