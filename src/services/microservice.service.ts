import axios from 'axios';
import Application from '../typings/application';
import CommandType from '../utils/command';
import Organization from '../typings/organization';
import Reading from '../typings/reading';
import Node from '../typings/node';
import User, { Role } from '../typings/user';
import { AlertInfo } from '../typings/alert';
import { NodeSettings } from '../typings/nodeSettings';

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost';
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT || '5000';

export interface BackendError {
  message: string;
}

interface AuthResponse {
  access_token: string;
}

const authenticate = async (email: string, password: string) => {
  const response = await axios.post<AuthResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/jwt/`,
    {
      email: email,
      password: password,
    }
  );

  console.log('login', response);

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

const getSession = async (
  token: string,
  nodeID: number,
  sessionID: number | 'latest'
) => {
  let url = `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/session`;

  if (sessionID !== 'latest') {
    url += '/' + sessionID;
  }

  const response = await axios.get<SessionResponse>(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: { nodeID: nodeID, sessionID: sessionID },
  });

  console.log('getSession', response);
  return response.data.readings;
};

type SessionIDsResponse = {
  IDs: number[];
};

const getSessionIDs = async (token: string, nodeID: number) => {
  const response = await axios.get<SessionIDsResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/sessions`,
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

const getOwnUserInfo = async (token: string) => {
  const response = await axios.get<User>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('getUserInfo', response);
  return response.data;
};

const getAlertInfo = async (token: string, alertID: string) => {
  const response = await axios.get<AlertInfo>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/alert/${alertID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const sendCommand = async (
  token: string,
  appID: string,
  nodeID: number,
  commandType: CommandType
) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/command/${commandType}`,
    {
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
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/alert/${alertID}`,
    {
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

interface IGetUserListResponse {
  users: User[];
}

const getUserList = async (token: string) => {
  const response = await axios.get<IGetUserListResponse>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('getUserList', response);
  return response.data.users;
};

const getUserInfo = async (token: string, userID: string) => {
  const response = await axios.get<User>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/user/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const createUser = async (
  token: string,
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  role: Role
) => {
  const response = await axios.post(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/user`,
    {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      role: role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

const updateUser = async (
  token: string,
  userID: string,
  email: string,
  first_name: string,
  last_name: string,
  oldPassword: string,
  newPassword: string,
  role: Role
) => {
  const response = await axios.put(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/user/${userID}`,
    {
      email: email,
      first_name: first_name,
      last_name: last_name,
      oldPassword: oldPassword,
      newPassword: newPassword,
      role: role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

const deleteUser = async (token: string, userID: string) => {
  const response = await axios.delete(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/user/${userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

const getNodeSettings = async (token: string, nodeID: number) => {
  const response = await axios.get<NodeSettings>(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/node/${nodeID}/settings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const updateNodeSettings = async (
  token: string,
  nodeID: number,
  settings: NodeSettings
) => {
  const response = await axios.put(
    `${WEBSOCKET_URL}:${WEBSOCKET_PORT}/api/node/${nodeID}/settings`,
    settings,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

const Microservice = {
  authenticate,
  getOrganizationsList,
  getApplicationsList,
  getNodes,
  getSession,
  getSessionIDs,
  getOwnUserInfo,
  getAlertInfo,
  sendCommand,
  handleAlert,
  getUserInfo,
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  getNodeSettings,
  updateNodeSettings,
};

export default Microservice;
