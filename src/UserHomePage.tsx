import { useState, useEffect } from 'react';
import axios from 'axios';

const UserHomePage = () => {
  // Define state to store the user name
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Define an async function to fetch the user name
    const fetchUserName = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('/api/get_user_detail/');
        // Assuming the response data contains the user name
        // Update the state with the fetched user name
        setUserName(response.data.username);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching user name:', error);
      }
    };

    // Call the fetchUserName function when the component mounts
    fetchUserName();

    // No need to define a cleanup function as we're not setting up any subscriptions

  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <h1>User Name: {userName}</h1>
    </div>
  );
};

export default UserHomePage;
