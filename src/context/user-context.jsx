import React, { createContext, useState, useEffect } from "react";
import AuthService from '../services/auth.service';
import Microservice from "../services/microservice.service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const MOCK_SENSORDATA = process.env.REACT_APP_MOCK_SENSORDATA || 0;

function UserContextProvider({ children }) {
  const [token, setToken] = useState(AuthService.getUserData());
  const [selectedOrg, setSelectedOrg] = useState({});
  const [selectedApp, setSelectedApp] = useState({});
  const [orgOptions, setOrgOptions] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {

      if (MOCK_SENSORDATA) {
        const MockData = (await import('../mock/mock_data')).default;
        setOrgOptions(MockData.orgOptions);
        return;
      }

      const list = await
        Microservice.getOrganizationsList(AuthService.getUserData());

      console.log('organizations', list);

      const options = list.map(({_id, organizationName}) => ({
        value: _id["$oid"],
        label: organizationName
      }));

      setOrgOptions(options);
    };

    func();
  }, []);
  
  useEffect(() => {
    if (!orgOptions.length) return;
    setSelectedOrg(orgOptions[0]);
  }, [orgOptions]);

  useEffect(() => {
    if (selectedOrg?.value === undefined) return;

    const func = async () => {

      if (MOCK_SENSORDATA) {
        const MockData = (await import('../mock/mock_data')).default;
        setAppOptions(MockData.appOptions[selectedOrg.value]);
        return;
      }

      const list = await
        Microservice.getApplicationList(AuthService.getUserData(), selectedOrg.value);

        console.log('applications', list);

        const options = list.map(({_id, applicationName}) => ({
          value: _id["$oid"],
          label: applicationName
        }));

        setAppOptions(options);
    }

    func();
  }, [selectedOrg, orgOptions]);

  useEffect(() => {
    if (!appOptions.length) return;
    setSelectedApp(appOptions[0]);
  }, [appOptions]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    else {
      navigate("/");
    }
  }, [token, navigate]);

  const shareData = {
    token: token,
    setToken: setToken,
    selectedOrg: selectedOrg,
    setSelectedOrg: setSelectedOrg,
    selectedApp: selectedApp,
    setSelectedApp: setSelectedApp,
    orgOptions: orgOptions,
    setOrgOptions: setOrgOptions,
    appOptions: appOptions,
    setAppOptions: setAppOptions,
  }

  return (
    <UserContext.Provider value={shareData}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
