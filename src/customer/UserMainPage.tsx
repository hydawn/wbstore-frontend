import UserHomePage from './UserHomePage.tsx'
import BookStorePage from './BookStorePage.tsx'
import OrdersPage from './OrdersPage.tsx'
import ShoppingCartPage from './ShoppingCartPage.tsx'

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
    {onPage === 'shopping cart' ? <ShoppingCartPage setOnPage={setOnPage} /> : null}
    {onPage === 'orders' ? <OrdersPage />: null}
  </>
  );
}

export default UserMainPage;
