import { useState, useEffect } from 'react';
import SideBar from './SideBar.tsx';
import UserMainPage from './UserMainPage.tsx';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [onPage, setOnPageRaw] = useState('home');
  const sideBarNames = ['home', 'books', 'shopping cart', 'orders'];
  let pageStack: string[] = [];
  const setOnPageStack = (page: string) => {
    pageStack.push(page);
    setOnPageRaw(page);
  };

  return (
  <>
    {/* render sidebar */}
    <SideBar onPage={onPage} setOnPage={setOnPageStack} sideBarNames={sideBarNames} />

    {/* render mainpage */}
    <UserMainPage onPage={onPage} setOnPage={setOnPageStack} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
  </>);
};

export default App
