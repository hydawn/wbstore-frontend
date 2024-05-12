import { useState, useEffect } from 'react';
import axios from 'axios';

import LoginSignupPage from './LoginSignupPage.tsx';
import MainPage from './MainPage.tsx';
import LoadingPage from './LoadingPage.tsx';

function checkUserLogin(setLoginStatus: Function, setLoginRole: Function) {
  axios.get(
    '/api/get_user_loggedin'
  ).then(resp => {
    console.log('got resp:', resp)
    if (resp.data.loggedin) {
      console.log('is loggedin: ', resp)
      setLoginStatus(true)
      setLoginRole(resp.data.role)
    } else {
      console.log('not loggedin yet')
      setLoginStatus(false)
    }
  }).catch(error => {
    console.error('check login error:', error)
    setLoginStatus(false)
  });
  return "good or bad, let's see console";
}

function App() {
  const [loginRole, setLoginRole] = useState('customer');
  const [loginStatus, setLoginStatus] = useState<boolean | null>(null);

  useEffect(() => {
    checkUserLogin(setLoginStatus, setLoginRole);
  }, []);

  if (loginStatus === null) {
    return <LoadingPage />;
  } else if (loginStatus) {
    return <MainPage loginStatus={loginStatus} loginRole={loginRole} setLoginStatus={setLoginStatus} />;
  } else {
    return <LoginSignupPage setLoginStatus={setLoginStatus} setLoginRole={setLoginRole} />;
  }
};

export default App;
