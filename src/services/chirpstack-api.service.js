import axios from 'axios';

const CHIRPSTACK_URL = process.env.REACT_APP_CHIRPSTACK_URL || "http://localhost"
const CHIRPSTACK_PORT = process.env.REACT_APP_CHIRPSTACK_PORT || "8080"

const getJWTToken = (email, password) => {
  return axios
    .post(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/internal/login`, {
      email: email,
      password: password
    });
}

const getOrganizationsList = (token) => {
  return axios
    .get(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/organizations`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
        params: {offset: '0', limit: '5'},
      })
    .then((response) => {
      return response.data?.result;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getApplicationList = (token, orgID) => {
  return axios
    .get(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/applications`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
        params: {offset: '0', limit: '5', organizationID: orgID},
      })
    .then((response) => {
      return response.data?.result;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getDeviceList = (token, appID) => {
  return axios
    .get(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/devices`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
        params: {offset: '0', limit: '5', applicationID: appID},
      })
    .then((response) => {
      return response.data?.result;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getDeviceInfo = (token, devEUI) => {
  return axios
    .get(`${CHIRPSTACK_URL}:${CHIRPSTACK_PORT}/api/devices/${devEUI}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Grpc-Metadata-Authorization': `Bearer ${token}`,
        },
      })
    .then((response) => {
      return response.data?.device;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getDeviceSensorPaths = async (token, appID) => {
  let list = await getDeviceList(token, appID);
  let sensor_paths = await Promise.all(list.map(async ({ devEUI }) => {
    let device_info = await getDeviceInfo(token, devEUI);
    return device_info.tags?.sensor_path;
  }));

  return sensor_paths;
}

const ChirpStack = {
  getJWTToken,
  getOrganizationsList,
  getApplicationList,
  getDeviceList,
  getDeviceSensorPaths,
  getDeviceInfo,
};

export default ChirpStack;
