import Microservice from './microservice.service';

const login = (username, password) => {
  return Microservice.authenticate(username, password)
    .then((response) => {
      localStorage.setItem("jwt-token", response.data?.access_token);
      return response.data?.access_token;
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
