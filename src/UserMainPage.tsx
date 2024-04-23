import LoginSignupPage from './LoginSignupPage.tsx'
import UserHomePage from './UserHomePage.tsx'

interface Props {
  onPage: string,
  setOnPage: Function,
}

function UserMainPage({ onPage, setOnPage }: Props) {
  return (
  <>
    {onPage === 'login' ? <LoginSignupPage setOnPage={setOnPage} /> : null}
    {onPage === 'home' ? <UserHomePage /> : null}
    {onPage === 'books' ? 'books page' : null}
    {onPage === 'shopping cart' ? 'shopping cart page' : null}
    {onPage === 'orders' ? 'orders page' : null}
  </>
  );
}

export default UserMainPage;
