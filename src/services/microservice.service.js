import axios from 'axios';

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || "http://localhost"
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || "5000"

const authenticate = (username, password) => {
  return axios
    .post(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/authenticate`, {
      username: username,
      password: password
    });
}

const getOrganizationsList = (token) => {
  return axios
    .get(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/organizations`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    .then((response) => {
      return response.data?.organizations;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getApplicationList = (token, orgID) => {
  return axios
    .get(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/applications`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {organizationID: orgID},
      })
    .then((response) => {
      return response.data?.applications;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getSensors = (token, appID) => {
  return axios
    .get(`${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/sensors`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {applicationID: appID},
      })
    .then((response) => {
      return response.data?.sensors;
    })
    .catch((error) => {
      console.log(error);
    });
}

const sendCommand = async (token, applicationID, sensorID, commandType) => {
  const response = await axios
    .post(
      `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/command`,
      {
        "command": commandType,
        "applicationID": applicationID,
        "sensorID": sensorID
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

  console.log(response);
  return response;
}

const sendConfirm = (token, alertID, confirmNote) => {
  return axios
    .post(
      `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/alert/confirm`,
      {
        "alertID": alertID,
        "confirmNote": confirmNote
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
}

const Microservice = {
  authenticate,
  getOrganizationsList,
  getApplicationList,
  getSensors,
  sendCommand,
  sendConfirm
};

export default Microservice;
