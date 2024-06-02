import { useState, useEffect } from 'react';
import LogoutButton from "../LogoutButton";
import axios from 'axios';

interface Props {
  setLoginStatus: Function
}

export default function MerchHomePage({ setLoginStatus }: Props) {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('/api/get_user_detail');
        setUserName(response.data.username);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);
  return (<>
    <h1>商户界面：{userName}</h1>
    <LogoutButton setLoginStatus={setLoginStatus} />
  </>);
}
