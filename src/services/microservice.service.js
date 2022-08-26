import axios from 'axios';

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost';
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || '5000';

const authenticate = async (username, password) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/authenticate`,
    {
      username: username,
      password: password,
    }
  );

  console.log('login', response);

  return [response.data?.access_token, response.data?.refresh_token];
};

const refresh = async (refreshToken) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  console.log('refresh', response);

  return response.data?.access_token;
};

const getOrganizationsList = async (token) => {
  const response = await axios.get(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/organizations`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Fetch orgs', response);
  return response.data?.organizations;
};

const getApplicationsList = async (token, orgID) => {
  const response = await axios.get(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/applications`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { organizationID: orgID },
    }
  );

  console.log('Fetch apps', response);
  return response.data?.applications;
};

const getSensors = async (token, appID) => {
  const response = await axios.get(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/sensors`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { applicationID: appID },
    }
  );

  console.log('getSensors', response);
  return response.data?.sensors;
};

const getReadings = async (token, sensorIDList) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/`,
    {
      paths: sensorIDList,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('getReadings', response);
  return response.data;
};

const sendCommand = async (token, appID, sensorID, commandType) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/command`,
    {
      command: commandType,
      applicationID: appID,
      sensorID: sensorID,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('sendCommand', response);
  return response;
};

const handleAlert = async (token, alertID, isConfirmed, handleNote) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/alert/handle`,
    {
      alertID: alertID,
      handleNote: handleNote,
      isConfirmed: isConfirmed,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('handleAlert', response);
  return response;
};

const Microservice = {
  authenticate,
  refresh,
  getOrganizationsList,
  getApplicationsList,
  getSensors,
  getReadings,
  sendCommand,
  handleAlert,
};

export default Microservice;
