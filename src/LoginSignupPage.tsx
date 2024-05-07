import { useRef, useState } from "react";
import axios from "axios";

interface LoginProps {
  setLoginStatus: Function
  setLoginRole: Function
}

function LoginWindow({setLoginStatus, setLoginRole}: LoginProps) {
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
      setLoginStatus(true);
      setLoginRole(resp.data.role);
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
    <button className="btn" onClick={submitLogin}>登录</button>
    </>
  );
}

function SignupWindow() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  let role = 'customer';
  function setRole(giveRole: string) {
    role = giveRole;
  };

  // const [role, setRole] = useState('customer');

  const submitSignup = async () => {
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const email = emailRef.current?.value || '';
    console.log(`hit signup username: [${username}] email: [${email}]`);
    await axios.post(
      '/api/signup',
      {username: username, password: password, email: email, role: role}
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
      <div className="form-check">
      <input className="form-check-input" type="checkbox" value="customer" id="checkDefault" checked onClick={() => { setRole('customer'); }} />
      <label className="form-check-label" htmlFor="checkDefault">customer</label>
      </div>
      <div className="form-check">
      <input className="form-check-input" type="checkbox" value="merchant" id="checkDefault" onClick={() => { setRole('merchant'); }} />
      <label className="form-check-label" htmlFor="checkDefault">merchant</label>
      </div>
      邮箱：
      <input type="text" ref={emailRef}/>
      密码：
      <input type="password" ref={passwordRef}/>
      <button className="btn" onClick={submitSignup}>注册</button>
      </>
  );
}

export default function LoginSignupPage({setLoginStatus, setLoginRole}: LoginProps) {
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
      <LoginWindow setLoginStatus={setLoginStatus} setLoginRole={setLoginRole} /> :
      <SignupWindow />}
    </>
  );
}
