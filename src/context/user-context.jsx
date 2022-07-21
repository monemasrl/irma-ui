import React, { createContext, useState, useEffect } from "react";
import AuthService from '../services/auth.service';
import Microservice from "../services/microservice.service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [token, setToken] = useState(AuthService.getUserData());
  const [selectedOrg, setSelectedOrg] = useState({});
  const [selectedApp, setSelectedApp] = useState({});
  const [orgOptions, setOrgOptions] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Microservice.getOrganizationsList(AuthService.getUserData())
      .then((list) => {
        console.log('organizations', list)
        let options = list.map(({_id, organizationName}) => ({
          value: _id["$oid"],
          label: organizationName
        }));
        setOrgOptions(options);
      });
  }, []);
  
  useEffect(() => {
    if (!orgOptions.length) return;
    setSelectedOrg(orgOptions[0]);
  }, [orgOptions]);

  useEffect(() => {
    if (selectedOrg?.value === undefined) return;

    Microservice.getApplicationList(AuthService.getUserData(), selectedOrg.value)
      .then((list) => {
        console.log('applications', list)
        let options = list.map(({_id, applicationName}) => ({
          value: _id["$oid"],
          label: applicationName
        }));
        setAppOptions(options);
      });
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
