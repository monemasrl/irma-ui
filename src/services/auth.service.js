import ChirpStack from './chirpstack-api.service';

const login = (email, password) => {
  return ChirpStack.getJWTToken(email, password)
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
