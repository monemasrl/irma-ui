import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios"

const CHIRPSTACK_URL = process.env.REACT_APP_CHIRPSTACK_URL || "http://localhost"
const CHIRPSTACK_PORT = process.env.REACT_APP_CHIRPSTACK_PORT || "8080"


export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(localStorage.getItem("jwt-token"));
  const navigate = useNavigate();

  const login = (email, password) => {
    return axios
      .post(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/internal/login`, {
        email: email,
        password: password
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("jwt-token", response.data.jwt);
          setUserData(response.data.jwt);
        }
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
