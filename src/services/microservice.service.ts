import axios from 'axios';
import CommandType from '../utils/commandType';
import SensorState from '../utils/sensorState';

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

export interface Organization {
  _id: {
    $oid: string;
  };
  organizationName: string;
}

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

export interface Application {
  _id: {
    $oid: string;
  };
  applicationName: string;
  organization: {
    $oid: string;
  };
}

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

export interface Sensor {
  _id: {
    $oid: string;
  };
  application: {
    $oid: string;
  };
  lastSeenAt: {
    $date: string;
  };
  organization: {
    $oid: string;
  };
  sensorID: string;
  sensorName: string;
  state: number;
}

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

export interface Reading {
  sensorID: string;
  sensorName: string;
  applicationID: string;
  state: SensorState;
  datiInterni: [
    { titolo: string; dato: number },
    { titolo: string; dato: number },
    { titolo: string; dato: number }
  ];
  unhandledAlertIDs: string[];
}

interface ReadingsResponse {
  readings: Reading[];
}

const getReadings = async (token: string, sensorIDList: string[]) => {
  const response = await axios.post<ReadingsResponse>(
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
