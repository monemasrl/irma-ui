import axios from 'axios';
import Application from '../typings/application';
import CommandType from '../utils/command';
import Organization from '../typings/organization';
import Reading from '../typings/reading';
import Node from '../typings/node';
import User from '../typings/user';

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
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/jwt/authenticate`,
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
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/jwt/refresh`,
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
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/organizations/`,
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
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/applications/`,
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

interface NodesResponse {
  nodes: Node[];
}

const getNodes = async (token: string, appID: string) => {
  const response = await axios.get<NodesResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/nodes/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { applicationID: appID },
    }
  );

  console.log('getNodes', response);
  return response.data.nodes;
};

type SessionResponse = {
  readings: Reading[];
};

const getSession = async (token: string, nodeID: number, sessionID: number) => {
  const response = await axios.get<SessionResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/session/`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { nodeID: nodeID, sessionID: sessionID },
    }
  );

  console.log('getSession', response);
  return response.data.readings;
};

type SessionIDsResponse = {
  IDs: number[];
};

const getSessionIDs = async (token: string, nodeID: number) => {
  const response = await axios.get<SessionIDsResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/session/ids`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { nodeID: nodeID },
    }
  );

  console.log('getSessionIDs', response);
  return response.data.IDs;
};

interface ReadingsResponse {
  readings: Reading[];
}

const getReadings = async (token: string, nodeIDList: number[]) => {
  const response = await axios.post<ReadingsResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/payload/`,
    {
      IDs: nodeIDList,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('getTotalReadings', response);
  return response.data.readings;
};

const getUserInfo = async (token: string) => {
  const response = await axios.get<User>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/user/info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('getUserInfo', response);
  return response.data;
};

const sendCommand = async (
  token: string,
  appID: string,
  nodeID: number,
  commandType: CommandType
) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/payload/command`,
    {
      command: commandType,
      applicationID: appID,
      nodeID: nodeID,
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
  getNodes,
  getReadings,
  getSession,
  getSessionIDs,
  getUserInfo,
  sendCommand,
  handleAlert,
};

export default Microservice;
