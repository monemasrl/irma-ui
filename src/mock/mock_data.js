const orgOptions = [
  {
    value: 'org1_value',
    label: 'org1_label',
  },
  {
    value: 'org2_value',
    label: 'org2_label',
  },
];

const appOptions = {
  org1_value: [
    {
      value: 'app1-org1_value',
      label: 'app1-org1_label',
    },
    {
      value: 'app2-org1_value',
      label: 'app2-org1_label',
    },
  ],
  org2_value: [
    {
      value: 'app1-org2_value',
      label: 'app1-org2_label',
    },
    {
      value: 'app2-org2_value',
      label: 'app2-org2_label',
    },
  ],
};

const sensorData = {
  'app1-org1_value': [
    {
      sensorID: '1',
      sensorName: 'sensor1_a1o1',
      applicationID: 'app1-org1_value',
      state: 'off',
      datiInterni: [
        {
          titolo: 'Media Letture Totali',
          dato: 2,
        },
        {
          titolo: 'Media Letture Mensili',
          dato: 3.5,
        },
        {
          titolo: 'Letture eseguite nel mese',
          dato: 7,
        },
      ],
      unhandledAlertIDs: [],
    },
    {
      sensorID: '2',
      sensorName: 'sensor2_a1o1',
      applicationID: 'app1-org1_value',
      state: 'ok',
      datiInterni: [
        {
          titolo: 'Media Letture Totali',
          dato: 4.6,
        },
        {
          titolo: 'Media Letture Mensili',
          dato: 1.5,
        },
        {
          titolo: 'Letture eseguite nel mese',
          dato: 10,
        },
      ],
      unhandledAlertIDs: [],
    },
    {
      sensorID: '3',
      sensorName: 'sensor3_a1o1',
      applicationID: 'app1-org1_value',
      state: 'rec',
      datiInterni: [
        {
          titolo: 'Media Letture Totali',
          dato: 4.6,
        },
        {
          titolo: 'Media Letture Mensili',
          dato: 1.5,
        },
        {
          titolo: 'Letture eseguite nel mese',
          dato: 10,
        },
      ],
      unhandledAlertIDs: [],
    },
    {
      sensorID: '4',
      sensorName: 'sensor4_a1o1',
      applicationID: 'app1-org1_value',
      state: 'alert',
      datiInterni: [
        {
          titolo: 'Media Letture Totali',
          dato: 4.6,
        },
        {
          titolo: 'Media Letture Mensili',
          dato: 1.5,
        },
        {
          titolo: 'Letture eseguite nel mese',
          dato: 10,
        },
      ],
      unhandledAlertIDs: ['alertID_123'],
    },
  ],
  'app2-org1_value': [],
  'app1-org2_value': [],
  'app2-org2_value': [],
};

const MockData = {
  orgOptions,
  appOptions,
  sensorData,
};

export default MockData;
