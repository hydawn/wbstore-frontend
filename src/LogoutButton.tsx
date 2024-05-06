import axios from 'axios';

interface Props {
  setLoginStatus: Function
}


export default function LogoutButton({setLoginStatus}: Props) {
  const handleLogout = async () => {
    await axios.post('/api/logout')
    .then((_) => {
      console.log('user logout!')
      setLoginStatus(false)
    })
    .catch((resp) => {
      console.error('logout error: ', resp);
    });
  };

  return <button className="btn btn-primary" onClick={handleLogout}>登出</button>
}
