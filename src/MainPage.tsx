import { useState } from 'react';
import SideBar from './SideBar.tsx';
import UserMainPage from './UserMainPage.tsx';
import MerchMainPage from './MerchMainPage.tsx';

interface Prop {
  loginStatus: boolean
  loginRole: string
  setLoginStatus: Function
};

function MainPage({loginStatus, loginRole, setLoginStatus}: Prop) {
  const [onPage, setOnPageRaw] = useState('home');

  let pageStack: string[] = [];
  const setOnPageStack = (page: string) => {
    pageStack.push(page);
    setOnPageRaw(page);
  };

  const userSideBarNames = ['home', 'books', 'shopping cart', 'orders'];
  const merchSideBarNames = ['home', 'books', 'orders'];
  function UserPage() {
    return (<>
      <SideBar onPage={onPage} setOnPage={setOnPageStack} sideBarNames={userSideBarNames} />
      <UserMainPage onPage={onPage} setOnPage={setOnPageStack} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
    </>);
  }
  function MerchPage() {
    return (<>
      <SideBar onPage={onPage} setOnPage={setOnPageStack} sideBarNames={merchSideBarNames} />
      <MerchMainPage onPage={onPage} setOnPage={setOnPageStack} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
    </>);
  }
  console.log('got loginRole ' + loginRole)
  return (loginRole === 'merchant' ? <MerchPage /> : <UserPage />);
}

export default MainPage;
