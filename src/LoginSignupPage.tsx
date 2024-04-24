import { useRef, useState } from "react";
import axios from "axios";

interface LoginProps {
  setOnPage: Function
}

function LoginWindow({setOnPage}: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const submitLogin = async () => {
  const submitLogin = async () => {
    console.log(`submit login username: [${username}] password: [${password}]`);
    await axios.post(
      '/api/login', {username: username, password: password}
    )
    .then(function (resp) {
      console.log('good:', resp)
      setOnPage('home');
    })
    .catch(function (resp) {
      console.log('signup error: ', resp);
      alert('signup error: ' + resp.response.data.error);
    })
  }

  return (
    <>
    用户名：
    <input type="text" onBlur={(e) => setUsername(e.target.value)}/>
    密码：
    <input type="password" onBlur={(e) => setPassword(e.target.value)}/>
    <button onClick={submitLogin}>登录</button>
    </>
  );
}

function SignupWindow() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // const [signupSuccess, setSignupSuccess] = useState(false);

  const submitSignup = async () => {
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const email = emailRef.current?.value || '';
    console.log(`hit signup username: [${username}] password: [${password}] email: [${email}]`);
    await axios.post(
      '/api/signup', {username: username, password: password, email: email}
    )
    .then((resp) => {
      console.log('signup success:', resp);
      // setOnPage('home');
      alert('signup success')
      //setSignupSuccess(true);
      // setAtLogin(true);
    })
    .catch((resp) => {
      console.log('submit signup error:', resp);
      alert('signup error: ' + resp.response.data.error)
    })
  }

  console.log('load signup window')

  return (
      <>
      用户名：
      <input type="text" ref={usernameRef}/>
      邮箱：
      <input type="text" ref={emailRef}/>
      密码：
      <input type="password" ref={passwordRef}/>
      <button onClick={submitSignup}>注册</button>
      </>
  );
}

export default function LoginSignupPage({setOnPage}: LoginProps) {
  const [atLogin, setAtLogin] = useState(true);

  function ChoseLoginSignup() {
    return (
      <>
        <button className="btn" onClick={() => setAtLogin(true)}>登录</button>
        <button className="btn" onClick={() => setAtLogin(false)}>注册</button>
      </>
    );
  }

  return (
    <>
      <ChoseLoginSignup />
      {atLogin ?
      <LoginWindow setOnPage={setOnPage} /> :
      <SignupWindow />}
    </>
  );
}
