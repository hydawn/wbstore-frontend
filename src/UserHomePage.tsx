import { useState, useEffect } from 'react';
import LoginSignupPage from './LoginSignupPage.tsx'
import axios from 'axios';

interface Props {
  setOnPage: Function
  loginStatus: boolean
  setLoginStatus: Function
}

function checkUserLogin(setLoginStatus: Function) {
  axios.get(
    '/api/get_user_loggedin'
  ).then(resp => {
    console.log('got resp:', resp)
    if (resp.data.loggedin) {
      console.log('is loggedin')
      setLoginStatus(true)
    } else {
      console.log('not loggedin yet')
      setLoginStatus(false)
    }
  }).catch(error => {
    console.error('check login error:', error)
    setLoginStatus(false)
  });
  return "good or bad, let's see console";
}

interface LoggedInProps {
  setLoginStatus: Function
}

function UserHomePageLoggedIn({setLoginStatus}: LoggedInProps) {
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

  const handleLogout = async () => {
    await axios.post('/api/logout')
    .then((_) => {
      console.log('user logout!')
      alert('logout, try to reload')
      setLoginStatus(false)
    })
    .catch((resp) => {
      console.error('logout error: ', resp);
    });
  };

  return (
    <>
      <h1>用户名：{userName}</h1>
      <button className="btn btn-primary" onClick={handleLogout}>登出</button>
    </>
  );
}

function UserHomePage({setOnPage, loginStatus, setLoginStatus}: Props) {
  useEffect(() => {
    checkUserLogin(setLoginStatus);
  }, []);
  return <>{loginStatus ? <UserHomePageLoggedIn setLoginStatus={setLoginStatus} /> : <LoginSignupPage setLoginStatus={setLoginStatus} />}</>
}

export default UserHomePage;
