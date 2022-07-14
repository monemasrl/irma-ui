import { useState, useContext } from 'react';
import AuthService from '../services/auth.service';
import './login.scss';
import '../components/ui/ui.css';
import { UserContext } from '../context/user-context';


export default function Login() {
  const [errorMessage, setErrorMessage] = useState("empty");
  const [isErrorHidden, setErrorHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSharedData = useContext(UserContext);

  const login = (email, password) => {
    AuthService.login(email, password)
      .then((token) => {
        userSharedData.setToken(token);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setErrorHidden(false);
        setTimeout(() => setErrorHidden(true), 2000);
      });
  }

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  return (
    <div className='login-root'>
      <div className={`error-message ${isErrorHidden ? 'hidden' : ''}`}>{errorMessage}</div>
      <div className='login-panel'>
        <h1 className='login-title'>Login Page!</h1>
        <div className='input-div'>
          <label>Email</label>
          <input onChange={handleEmailChange} />
          <label>Password</label>
          <input type='password' onChange={handlePasswordChange} />
        </div>
        <button className='login-button' onClick={() => login(email, password)}>Login</button>
      </div>
    </div>
  );
}
