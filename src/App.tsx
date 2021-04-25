import { useState, useEffect } React from 'react';
import './App.css';
import Sitebar from "./home/Navbar";
import Auth from "./auth/Auth"

document.title = "Nice Boy Vice"

type AppState = {
  email: String,
  password: String
}

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState(""); //1

  useEffect(() => { //2
    if(localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem("token") ? <StoreIndex token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
