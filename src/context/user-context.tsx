import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import Microservice, {
  Application,
  Organization,
  Reading,
  Sensor,
} from '../services/microservice.service';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import CommandType from '../utils/commandType';
import { OrgOption } from '../mock/mock_data';

const MOCK_SENSORDATA = process.env.REACT_APP_MOCK_SENSORDATA || 0;
const MOCK_LOGIN = process.env.REACT_APP_MOCK_LOGIN || 0;

interface IEntry {
  label: string;
  value: string;
}

export interface IUserContext {
  selectedOrg?: IEntry;
  setSelectedOrg: (entry: IEntry) => void;
  selectedApp?: IEntry;
  setSelectedApp: (entry: IEntry) => void;
  orgOptions: IEntry[];
  appOptions: IEntry[];
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getSensors: () => Promise<Sensor[]>;
  getReadings: (sensorIDList: string[]) => Promise<Reading[]>;
  sendCommand: (
    appID: string,
    sensorID: string,
    commandType: CommandType
  ) => Promise<void>;
  handleAlert: (
    alertID: string,
    isConfirmed: boolean,
    handleNote: string
  ) => Promise<void>;
}

// TODO: fix default value
const UserContext = createContext<IUserContext>(undefined!);

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
        if (error instanceof AxiosError && error.response?.status === 401) {
          logout();
          return;
        }
        console.log(error);
      }
    },
    [refreshToken]
  );

  const getSensors = async () => {
    if (!selectedApp || !accessToken) return [];

    let list: Sensor[] = [];

    try {
      list = await Microservice.getSensors(accessToken, selectedApp.value);
    } catch (error) {
      refreshIfUnauthorized(error);
    }

    return list;
  };

  const getReadings = async (sensorIDList: string[]) => {
    if (!accessToken) return [];

    let readings: Reading[] = [];

    try {
      readings = await Microservice.getReadings(accessToken, sensorIDList);
    } catch (error) {
      refreshIfUnauthorized(error);
    }

    return readings;
  };

  const sendCommand = async (
    appID: string,
    sensorID: string,
    commandType: CommandType
  ) => {
    if (!accessToken) return;

    try {
      Microservice.sendCommand(accessToken, appID, sensorID, commandType);
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
      if (MOCK_SENSORDATA) {
        const MockData = (await import('../mock/mock_data.json')).default;
        setOrgOptions(MockData.orgOptions);
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
      if (MOCK_SENSORDATA) {
        const MockData = (await import('../mock/mock_data.json')).default;
        setAppOptions(MockData['appOptions'][selectedOrg.value as OrgOption]);
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
    getSensors,
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
