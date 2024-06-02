import { useState } from 'react';
import SideBar from './SideBar.tsx';
import UserMainPage from './customer/UserMainPage.tsx';
import MerchMainPage from './merchpage/MerchMainPage.tsx';
import { Container, Row, Col } from 'react-bootstrap';
import './MainPage.css';

interface Prop {
  loginRole: string
  setLoginStatus: Function
};

function MainPage({loginRole, setLoginStatus}: Prop) {
  const [onPage, setOnPageRaw] = useState('home');

  let pageStack: string[] = [];
  const setOnPageStack = (page: string) => {
    pageStack.push(page);
    setOnPageRaw(page);
  };

  const userSideBarNames = ['home', 'books', 'shopping cart', 'orders'];
  const merchSideBarNames = ['home', 'books', 'add books', 'orders'];
  function UserPage() {
    return <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <SideBar onPage={onPage} setOnPage={setOnPageStack} sideBarNames={userSideBarNames} />
        </Col>
        <Col xs={10} id="main-content-wrapper">
          <UserMainPage onPage={onPage} setOnPage={setOnPageStack} setLoginStatus={setLoginStatus} />
        </Col>
      </Row>
    </Container>;
  }
  function MerchPage() {
    return <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <SideBar onPage={onPage} setOnPage={setOnPageStack} sideBarNames={merchSideBarNames} />
        </Col>
        <Col xs={10} id="main-content-wrapper">
          <MerchMainPage onPage={onPage} setOnPage={setOnPageStack} setLoginStatus={setLoginStatus} />
        </Col>
      </Row>
    </Container>;
  }
  return (loginRole === 'merchant' ? <MerchPage /> : <UserPage />);
}

export default MainPage;
