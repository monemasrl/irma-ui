import React, { createContext, useState, useEffect, useCallback } from 'react';
import Microservice from '../services/microservice.service';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const MOCK_SENSORDATA = process.env.REACT_APP_MOCK_SENSORDATA || 0;
const MOCK_LOGIN = process.env.REACT_APP_MOCK_LOGIN || 0;

function UserContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token')
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token')
  );

  const [selectedOrg, setSelectedOrg] = useState({});
  const [selectedApp, setSelectedApp] = useState({});
  const [orgOptions, setOrgOptions] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const navigate = useNavigate();

  const authenticate = async (username, password) => {
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
    async (error) => {
      if (error.response?.status !== 401) return;

      try {
        const aToken = await Microservice.refresh(refreshToken);
        setAccessToken(aToken);
        localStorage.setItem('access_token', aToken);
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        }
      }
    },
    [refreshToken]
  );

  const getSensors = async () => {
    if (!selectedApp?.value) return [];

    let list = [];

    try {
      list = Microservice.getSensors(accessToken, selectedApp.value);
    } catch (error) {
      refreshIfUnauthorized(error);
    }

    return list;
  };

  const getReadings = async (sensorIDList) => {
    let readings = [];

    try {
      readings = await Microservice.getReadings(accessToken, sensorIDList);
    } catch (error) {
      refreshIfUnauthorized(error);
    }

    return readings;
  };

  const sendCommand = async (appID, sensorID, commandType) => {
    try {
      Microservice.sendCommand(accessToken, appID, sensorID, commandType);
    } catch (error) {
      refreshIfUnauthorized(error);
    }
  };

  const handleAlert = async (alertID, isConfirmed, handleNote) => {
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
        const MockData = (await import('../mock/mock_data')).default;
        setOrgOptions(MockData.orgOptions);
        return;
      }

      let list = [];

      try {
        list = await Microservice.getOrganizationsList(accessToken);
      } catch (error) {
        refreshIfUnauthorized(error);
      }

      console.log('organizations', list);

      const options = list.map(({ _id, organizationName }) => ({
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
    if (selectedOrg?.value === undefined) return;
    if (!accessToken) return;

    const func = async () => {
      if (MOCK_SENSORDATA) {
        const MockData = (await import('../mock/mock_data')).default;
        setAppOptions(MockData.appOptions[selectedOrg.value]);
        return;
      }

      let list = [];

      try {
        list = await Microservice.getApplicationsList(
          accessToken,
          selectedOrg.value
        );
      } catch (error) {
        refreshIfUnauthorized(error);
      }

      console.log('applications', list);

      const options = list.map(({ _id, applicationName }) => ({
        value: _id['$oid'],
        label: applicationName,
      }));

      setAppOptions(options);
    };

    func();
  }, [
    selectedOrg.value,
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

  const shareData = {
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
    <UserContext.Provider value={shareData}>{children}</UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
