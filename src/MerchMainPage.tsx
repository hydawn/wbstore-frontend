import LogoutButton from "./LogoutButton";

interface Props {
  onPage: string,
  setOnPage: Function,
  loginStatus: boolean,
  setLoginStatus: Function,
}


export default function MerchMainPage({ onPage, setOnPage, loginStatus, setLoginStatus }: Props) {
  return (<>
    <h1>Hello, Merchant Page Here</h1>
    <LogoutButton setLoginStatus={setLoginStatus} />
  </>);
}
