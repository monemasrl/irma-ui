const orgOptions = [
  {
    value: "org1_value",
    label: "org1_label",
  },
  {
    value: "org2_value",
    label: "org2_label",
  }
];

const appOptions = {
  "org1_value": [
    {
      value: "app1-org1_value",
      label: "app1-org1_label"
    },
    {
      value: "app2-org1_value",
      label: "app2-org1_label"
    },
  ],
  "org2_value": [
    {
      value: "app1-org2_value",
      label: "app1-org2_label"
    },
    {
      value: "app2-org2_value",
      label: "app2-org2_label"
    },
  ]
}

const MockData = {
  orgOptions,
  appOptions
};

export default MockData;
