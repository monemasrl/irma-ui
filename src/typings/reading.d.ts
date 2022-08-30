import { SensorState } from './sensor';

type Reading = {
  sensorID: string;
  sensorName: string;
  applicationID: string;
  state: SensorState;
  datiInterni: [
    { titolo: string; dato: number },
    { titolo: string; dato: number },
    { titolo: string; dato: number }
  ];
  unhandledAlertIDs: string[];
};

export default Reading;
