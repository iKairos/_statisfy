import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    try{
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken;
    }catch(error){
      return undefined;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    if(typeof userToken === 'undefined'){
      return;
    }else{
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    }
  };

  return {
    setToken: saveToken,
    token
  }
}