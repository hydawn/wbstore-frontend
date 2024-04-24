import { useState, useEffect } from 'react';
import SideBar from './SideBar.tsx';
import UserMainPage from './UserMainPage.tsx';
import axios from 'axios';

// const debug_host = 'http://localhost:8000'
const debug_host = ''

function checkUserLogin(setOnPage: Function) {
  axios.get(
    debug_host + '/api/get_user_loggedin'
  ).then(resp => {
    console.log('got resp:', resp)
    if (resp.data.loggedin) {
      console.log('is loggedin')
      setOnPage('home')
    } else {
      console.log('not loggedin yet')
      setOnPage('login')
    }
  }).catch(error => {
    console.error('error:', error)
    alert('unknown error')
  });
  return "good or bad, let's see console";
}

function App() {
  const [onPage, setOnPageRaw] = useState('home');
  const sideBarNames = ['home', 'books', 'shopping cart', 'orders'];
  let pageStack: string[] = [];
  const setOnPageStack = (page: string) => {
    pageStack.push(page);
    setOnPageRaw(page);
  };

  useEffect(() => {
    checkUserLogin(setOnPageStack);
  }, []);

  return (
  <>
    {/* render sidebar */}
    <SideBar onPage={onPage} setOnPage={setOnPageStack} sideBarNames={sideBarNames} />

    {/* TODO: render main page */}
    <UserMainPage onPage={onPage} setOnPage={setOnPageStack} />

  </>);
};

export default App
