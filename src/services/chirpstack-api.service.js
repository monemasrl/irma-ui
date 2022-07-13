import axios from 'axios';

const CHIRPSTACK_URL = process.env.REACT_APP_CHIRPSTACK_URL || "http://localhost"
const CHIRPSTACK_PORT = process.env.REACT_APP_CHIRPSTACK_PORT || "8080"

const getJWTToken = (email, password) => {
  return axios
    .post(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/internal/login`, {
      email: email,
      password: password
    });
}

const getOrganizationsList = (token) => {
  return axios
    .get(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/organizations`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
        params: {offset: '0', limit: '5'},
      })
    .then((response) => {
      return response.data?.result;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getApplicationList = (token, orgID) => {
  return axios
    .get(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/applications`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
        params: {offset: '0', limit: '5', organizationID: orgID},
      })
    .then((response) => {
      console.log(response);
      return response.data?.result;
    })
    .catch((error) => {
      console.log(error);
    });
}

const ChirpStack = {
  getJWTToken,
  getOrganizationsList,
  getApplicationList
};

export default ChirpStack;
