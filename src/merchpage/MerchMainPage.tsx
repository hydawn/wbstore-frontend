import MerchHomePage from "./MerchHomePage.tsx";
import BookStorePage from "./BookStorePage.tsx";
import OrdersPage from "./OrdersPage.tsx";
import AddBookPage from "./AddBookPage.tsx";

interface Props {
  onPage: string,
  setOnPage: Function,
  loginStatus: boolean,
  setLoginStatus: Function,
}

export default function MerchMainPage({ onPage, setOnPage, loginStatus, setLoginStatus }: Props) {
  return (
  <>
    {onPage === 'home' ? <MerchHomePage setLoginStatus={setLoginStatus} /> : null}
    {onPage === 'books' ? <BookStorePage /> : null}
    {onPage === 'add books' ? <AddBookPage /> : null}
    {onPage === 'orders' ? <OrdersPage /> : null}
  </>
  );
}
