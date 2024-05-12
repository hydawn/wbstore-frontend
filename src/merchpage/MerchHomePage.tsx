import LogoutButton from "../LogoutButton";

interface Props {
  setLoginStatus: Function
}

export default function MerchHomePage({ setLoginStatus }: Props) {
  return (<>
    <h1>Hello, Merchant Page Here</h1>
    <LogoutButton setLoginStatus={setLoginStatus} />
  </>);
}
