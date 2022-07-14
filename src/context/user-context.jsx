import React, { createContext, useState, useEffect } from "react";
import AuthService from '../services/auth.service';
import ChirpStack from "../services/chirpstack-api.service";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [token, setToken] = useState(AuthService.getUserData());
  const [selectedOrgID, setSelectedOrgID] = useState(-1);
  const [selectedAppID, setSelectedAppID] = useState(-1);
  const [orgOptions, setOrgOptions] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ChirpStack.getOrganizationsList(AuthService.getUserData())
      .then((list) => {
        let options = list.map(({id, displayName}) => ({
          value: id,
          label: displayName
        }));
        setOrgOptions(options);
      });
  }, []);
  
  useEffect(() => {
    if (!orgOptions.length) return;
    setSelectedOrgID(orgOptions[0].value);
  }, [orgOptions]);

  useEffect(() => {
    if (selectedOrgID === -1) return;

    ChirpStack.getApplicationList(AuthService.getUserData(), selectedOrgID)
      .then((list) => {
        let options = list.map(({id, name}) => ({
          value: id,
          label: name
        }));
        setAppOptions(options);
      });
  }, [selectedOrgID, orgOptions]);

  useEffect(() => {
    if (!appOptions.length) return;
    setSelectedAppID(appOptions[0].value);
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
    selectedOrgID: selectedOrgID,
    setSelectedOrgID: setSelectedOrgID,
    selectedAppID: selectedAppID,
    setSelectedAppID: setSelectedAppID,
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
