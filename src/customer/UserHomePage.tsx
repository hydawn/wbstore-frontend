import { useState, useEffect } from 'react';
import LogoutButton from '../LogoutButton';
import axios from 'axios';

interface Props {
  setLoginStatus: Function
}

function UserHomePage({setLoginStatus}: Props) {
  // fetch user name
  const [userName, setUserName] = useState('');
  useEffect(() => {
    // Define an async function to fetch the user name
    const fetchUserName = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('/api/get_user_detail');
        // Assuming the response data contains the user name
        // Update the state with the fetched user name
        setUserName(response.data.username);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    // Call the fetchUserName function when the component mounts
    fetchUserName();
    // No need to define a cleanup function as we're not setting up any subscriptions
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <>
      <h1>用户界面：{userName}</h1>
      <LogoutButton setLoginStatus={setLoginStatus} />
    </>
  );
}

export default UserHomePage;
