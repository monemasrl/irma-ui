export type SensorState =
  | 'ok'
  | 'rec'
  | 'off'
  | 'alert-ready'
  | 'alert-running';

type Sensor = {
  _id: {
    $oid: string;
  };
  application: {
    $oid: string;
  };
  lastSeenAt: {
    $date: string;
  };
  organization: {
    $oid: string;
  };
  sensorID: string;
  sensorName: string;
  state: number;
};

export default Sensor;
