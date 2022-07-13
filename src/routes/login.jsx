import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';


export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
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
        setTimeout(() => setErrorMessage(""), 2000);
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
    <>
      <p>{errorMessage}</p>
      <main>
        <p>Login Page!</p>
        <input onChange={handleEmailChange} />
        <input onChange={handlePasswordChange} />
        <button onClick={() => login(email, password)}>Login</button>
      </main>
    </>
  );
}
