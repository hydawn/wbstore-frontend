import { useState } from "react";
import axios from "axios";

interface Props {
  setOnPage: Function
}


function LoginWindow({setOnPage}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const submitLogin = async () => {
  const submitLogin = async () => {
    console.log(`submit login username: [${username}] password: [${password}]`);
    // try {
    //   const resp = await axios.post('/api/login', {username: username, password: password});
    //   console.log('Login good:', resp);
    //   setIsLoggedIn(true);
    // } catch (error) {
    //   console.error('Login failed:', error);
    // }
    axios.post(
      '/api/login', {username: username, password: password}
    )
    .then(function (resp) {
      console.log('good:', resp)
      setOnPage('home');
    })
    .catch(function (resp) {
      console.log('error:', resp)
    })
  }

  return (
    <>
    用户名：
    <input type="text" onChange={(e) => setUsername(e.target.value)}/>
    密码：
    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={submitLogin}>登录</button>
    </>
  );
}

function SignupWindow() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitSignup() {
    console.log(`hit signup username: [${username}] password: [${password}]`);
  }

  return (
    <>
    用户名：
    <input type="text" onChange={(e) => setUsername(e.target.value)}/>
    密码：
    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={submitSignup}>注册</button>
    </>
  );
}

export default function LoginSignupPage({setOnPage}: Props) {
  const [atLogin, setAtLogin] = useState(true);

  function ChoseLoginSignup() {
    return (
      <>
        <button onClick={() => setAtLogin(true)}>登录</button>
        <button onClick={() => setAtLogin(false)}>注册</button>
      </>
    );
  }

  return (
    <>
      <ChoseLoginSignup />
      {atLogin ? <LoginWindow setOnPage={setOnPage} /> : <SignupWindow />}
    </>
  );
}
