import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import Microservice from '../services/microservice.service';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import CommandType from '../typings/command';
import { OrgOption } from '../mock/mock_data';
import Organization from '../typings/organization';
import Application from '../typings/application';
import Node from '../typings/node';
import Reading from '../typings/reading';

const MOCK_DATA = process.env.REACT_APP_MOCK_DATA || 0;
const MOCK_LOGIN = process.env.REACT_APP_MOCK_LOGIN || 0;

interface IEntry {
  label: string;
  value: string;
}

export interface IUserContext {
  selectedOrg?: IEntry;
  setSelectedOrg: Dispatch<SetStateAction<IEntry | undefined>>;
  selectedApp?: IEntry;
  setSelectedApp: Dispatch<SetStateAction<IEntry | undefined>>;
  orgOptions: IEntry[];
  appOptions: IEntry[];
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getNodes: () => Promise<Node[]>;
  getReadings: (nodeIDList: number[]) => Promise<Reading[]>;
  sendCommand: (
    appID: string,
    nodeID: number,
    commandType: CommandType
  ) => Promise<void>;
  handleAlert: (
    alertID: string,
    isConfirmed: boolean,
    handleNote: string
  ) => Promise<void>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

type Props = {
  children: ReactNode;
};

function UserContextProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token')
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token')
  );

  const [selectedOrg, setSelectedOrg] = useState<IEntry | undefined>(undefined);
  const [selectedApp, setSelectedApp] = useState<IEntry | undefined>(undefined);
  const [orgOptions, setOrgOptions] = useState<IEntry[]>([]);
  const [appOptions, setAppOptions] = useState<IEntry[]>([]);
  const navigate = useNavigate();

  const authenticate = async (username: string, password: string) => {
    if (MOCK_LOGIN) {
      setAccessToken('1234');
      setRefreshToken('1234');
      return;
    }

    const [aToken, rToken] = await Microservice.authenticate(
      username,
      password
    );

    setAccessToken(aToken);
    setRefreshToken(rToken);

    localStorage.setItem('access_token', aToken);
    localStorage.setItem('refresh_token', rToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const refreshIfUnauthorized = useCallback(
    async (error: unknown) => {
      if (!(error instanceof AxiosError)) {
        console.log(error);
        return;
      }

      if (error.response?.status !== 401) return;

      try {
        if (!refreshToken) {
          logout();
          return;
        }

        const aToken = await Microservice.refresh(refreshToken);
        setAccessToken(aToken);
        localStorage.setItem('access_token', aToken);
      } catch (error) {
        if (error instanceof AxiosError) {
          logout();
          return;
        }
        console.log(error);
      }
    },
    [refreshToken]
  );

  const getNodes = async () => {
    if (!selectedApp || !accessToken) return [];

    let list: Node[] = [];

    try {
      list = await Microservice.getNodes(accessToken, selectedApp.value);
    } catch (error) {
      refreshIfUnauthorized(error);
    }

    return list;
  };

  const getReadings = async (nodeIDList: number[]) => {
    if (!accessToken) return [];

    let readings: Reading[] = [];

    try {
      readings = await Microservice.getReadings(accessToken, nodeIDList);
    } catch (error) {
      refreshIfUnauthorized(error);
    }

    return readings;
  };

  const sendCommand = async (
    appID: string,
    nodeID: number,
    commandType: CommandType
  ) => {
    if (!accessToken) return;

    try {
      Microservice.sendCommand(accessToken, appID, nodeID, commandType);
    } catch (error) {
      refreshIfUnauthorized(error);
    }
  };

  const handleAlert = async (
    alertID: string,
    isConfirmed: boolean,
    handleNote: string
  ) => {
    if (!accessToken) return;

    try {
      Microservice.handleAlert(accessToken, alertID, isConfirmed, handleNote);
    } catch (error) {
      refreshIfUnauthorized(error);
    }
  };

  // Fetch organizations
  useEffect(() => {
    if (!accessToken) return;

    const func = async () => {
        const MockData = (await import('../mock/mock_data.json')).default;
        setOrgOptions(MockData.orgOptions);
      if (MOCK_DATA) {
        return;
      }

      let list: Organization[] = [];

      try {
        list = await Microservice.getOrganizationsList(accessToken);
      } catch (error) {
        refreshIfUnauthorized(error);
      }

      console.log('organizations', list);

      const options: IEntry[] = list.map(({ _id, organizationName }) => ({
        value: _id['$oid'],
        label: organizationName,
      }));

      setOrgOptions(options);
    };

    func();
  }, [accessToken, refreshIfUnauthorized]);

  // Change default organization on organizations change
  useEffect(() => {
    if (!orgOptions.length) return;
    setSelectedOrg(orgOptions[0]);
  }, [JSON.stringify(orgOptions)]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch applications on selected organization change
  useEffect(() => {
    if (!selectedOrg || !accessToken) return;

    const func = async () => {
        const MockData = (await import('../mock/mock_data.json')).default;
        setAppOptions(MockData['appOptions'][selectedOrg.value as OrgOption]);
      if (MOCK_DATA) {
        return;
      }

      let list: Application[] = [];

      try {
        list = await Microservice.getApplicationsList(
          accessToken,
          selectedOrg.value
        );
      } catch (error) {
        refreshIfUnauthorized(error);
      }

      console.log('applications', list);

      const options: IEntry[] = list.map(({ _id, applicationName }) => ({
        value: _id['$oid'],
        label: applicationName,
      }));

      setAppOptions(options);
    };

    func();
  }, [
    selectedOrg?.value,
    JSON.stringify(orgOptions),
    accessToken,
    refreshIfUnauthorized,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  // Change default application on applications change
  useEffect(() => {
    if (!appOptions.length) return;
    setSelectedApp(appOptions[0]);
  }, [JSON.stringify(appOptions)]); // eslint-disable-line react-hooks/exhaustive-deps

  // Navigate the user on login and logout
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const userShareData: IUserContext = {
    selectedOrg,
    setSelectedOrg,
    selectedApp,
    setSelectedApp,
    orgOptions,
    appOptions,
    authenticate,
    logout,
    getNodes,
    getReadings,
    sendCommand,
    handleAlert,
  };

  return (
    <UserContext.Provider value={userShareData}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
