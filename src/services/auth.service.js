import axios from 'axios';

const CHIRPSTACK_URL = process.env.REACT_APP_CHIRPSTACK_URL || "http://localhost"
const CHIRPSTACK_PORT = process.env.REACT_APP_CHIRPSTACK_PORT || "8080"

const login = (email, password) => {
  return axios
    .post(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/internal/login`, {
      email: email,
      password: password
    })
    .then((response) => {
      localStorage.setItem("jwt-token", response.data?.jwt);
      return response.data?.jwt;
    });
}

const logout = () => {
  localStorage.removeItem("jwt-token");
}

const getUserData = () => {
  return localStorage.getItem("jwt-token");
}

const AuthService = {
  login,
  logout,
  getUserData
}

export default AuthService;
