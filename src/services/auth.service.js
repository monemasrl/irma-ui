import Microservice from './microservice.service';

const MOCK_LOGIN = process.env.REACT_APP_MOCK_LOGIN || 0;

const login = async (username, password) => {
  if (MOCK_LOGIN) {
    return "1234foobar";
  }

  const response = Microservice.authenticate(username, password)
  localStorage.setItem("jwt-token", response.data?.access_token);
  return response.data?.access_token;
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
