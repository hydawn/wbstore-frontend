import UserHomePage from './UserHomePage.tsx'

interface Props {
  onPage: string,
  setOnPage: Function,
  loginStatus: boolean,
  setLoginStatus: Function,
}

function UserMainPage({ onPage, setOnPage, loginStatus, setLoginStatus }: Props) {
  return (
  <>
    {onPage === 'home' ? <UserHomePage setOnPage={setOnPage} loginStatus={loginStatus} setLoginStatus={setLoginStatus} /> : null}
    {onPage === 'books' ? 'books page' : null}
    {onPage === 'shopping cart' ? 'shopping cart page' : null}
    {onPage === 'orders' ? 'orders page' : null}
  </>
  );
}

export default UserMainPage;
