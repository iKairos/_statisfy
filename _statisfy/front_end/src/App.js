import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions/userActions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => 
    state.users
  );
  const {loading, error, userData} = dataSelector;

  useEffect(() => {
    dispatch(getUser(9875));
  }, [])

  return (
    loading ? (<p>loading...</p>) :
    error ? (<p>Error: {error}</p>) : (
      <div className="App">
        <p>{userData.username}</p>
        <p>{userData.email_address}</p>
      </div>
    )
  );
}

export default App;
