type Application = {
  _id: {
    $oid: string;
  };
  applicationName: string;
  organization: {
    $oid: string;
  };
};

export default Application;
