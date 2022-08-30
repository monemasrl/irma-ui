import axios from 'axios';
import Application from '../typings/application';
import CommandType from '../typings/command';
import Organization from '../typings/organization';
import Reading from '../typings/reading';
import Sensor from '../typings/sensor';

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost';
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || '5000';

export interface BackendError {
  message: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

const authenticate = async (username: string, password: string) => {
  const response = await axios.post<AuthResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/authenticate`,
    {
      username: username,
      password: password,
    }
  );

  console.log('login', response);

  return [response.data.access_token, response.data.refresh_token];
};

interface RefreshResponse {
  access_token: string;
}

const refresh = async (refreshToken: string) => {
  const response = await axios.post<RefreshResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  console.log('refresh', response);

  return response.data.access_token;
};

interface OrgsListResponse {
  organizations: Organization[];
}

const getOrganizationsList = async (token: string) => {
  const response = await axios.get<OrgsListResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/organizations`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Fetch orgs', response);
  return response.data.organizations;
};

interface AppsListResponse {
  applications: Application[];
}

const getApplicationsList = async (token: string, orgID: string) => {
  const response = await axios.get<AppsListResponse>(
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

interface SensorsResponse {
  sensors: Sensor[];
}

const getSensors = async (token: string, appID: string) => {
  const response = await axios.get<SensorsResponse>(
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
  return response.data.sensors;
};

interface ReadingsResponse {
  readings: Reading[];
}

const getReadings = async (token: string, sensorIDList: string[]) => {
  const response = await axios.post<ReadingsResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/`,
    {
      IDs: sensorIDList,
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
  return response.data.readings;
};

const sendCommand = async (
  token: string,
  appID: string,
  sensorID: string,
  commandType: CommandType
) => {
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

const handleAlert = async (
  token: string,
  alertID: string,
  isConfirmed: boolean,
  handleNote: string
) => {
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
