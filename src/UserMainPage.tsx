import UserHomePage from './UserHomePage.tsx'
import BookStorePage from './BookStorePage.tsx'

interface Props {
  onPage: string,
  setOnPage: Function,
  loginStatus: boolean,
  setLoginStatus: Function,
}

function UserMainPage({ onPage, setOnPage, loginStatus, setLoginStatus }: Props) {
  return (
  <>
    {onPage === 'home' ? <UserHomePage setLoginStatus={setLoginStatus} /> : null}
    {onPage === 'books' ? <BookStorePage setOnPage={setOnPage} /> : null}
    {onPage === 'shopping cart' ? 'shopping cart page' : null}
    {onPage === 'orders' ? 'orders page' : null}
  </>
  );
}

export default UserMainPage;
