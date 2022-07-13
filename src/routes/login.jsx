import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import './login.scss';
import '../components/ui/ui.css';


export default function Login() {
  const [errorMessage, setErrorMessage] = useState("empty");
  const [isErrorHidden, setErrorHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(AuthService.getUserData());
  const navigate = useNavigate();

  const login = (email, password) => {
    AuthService.login(email, password)
      .then((token) => {
        setUserData(token);
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

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div className='login-root'>
      <div className={`error-message ${isErrorHidden ? 'hidden' : ''}`}>{errorMessage}</div>
      <div className='login-panel'>
        <h1 className='login-title'>Login Page!</h1>
        <div className='input-div'>
          <label for='email'>Email</label>
          <input id='email' onChange={handleEmailChange} />
          <label for='password'>Password</label>
          <input type='password' id='password' onChange={handlePasswordChange} />
        </div>
        <button className='login-button' onClick={() => login(email, password)}>Login</button>
      </div>
    </div>
  );
}
