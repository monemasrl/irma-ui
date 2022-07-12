import axios from "axios"

const CHIRPSTACK_URL = process.env.REACT_APP_CHIRPSTACK_URL || "http://localhost"
const CHIRPSTACK_PORT = process.env.REACT_APP_CHIRPSTACK_PORT || "8080"

const login = (email, password) => {
  axios
    .post(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/internal/login`, {
      email: email,
      password: password
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("jwt-token", response.data.jwt)
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const logout = () => {
  localStorage.removeItem("jwt-token");
}

const AuthService = {
  login,
  logout,
};
export default AuthService;
