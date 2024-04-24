import { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  setOnPage: Function
}

const UserHomePage = ({setOnPage}: Props) => {
  // Define state to store the user name
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

  const handleLogout = async () => {
    await axios.post('/api/logout')
    .then((resp) => {
      console.log('user logout!')
      alert('logout, try to reload')
      setOnPage('login')
    })
    .catch((resp) => {
      console.error('logout error: ', resp);
    });
  };

  return (
    <div>
      <h1>用户名：{userName}</h1>
      <button className="btn btn-primary" onClick={handleLogout}>登出</button>
    </div>
  );
};

export default UserHomePage;
