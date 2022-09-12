type Sensore = {
  canID: string;
  dangerLevel: number;
  nodeID: number;
  publishedAt: string;
  readingID: number;
  sensorNumber: string;
  sessionID: number;
  totalCount: number;
};

type SensoreWindow = {
  canID: string;
  nodeID: number;
  publishedAt: string;
  readingID: number;
  sensorNumber: string;
  sessionID: number;
  windowNumber: number;
  count: number;
};
interface Rilevatore {
  id: number;
  sensore1: Sensore[];
  sensore1Windows: SensoreWindow[];
  sensore2: Sensore[];
  sensore2Windows: SensoreWindow[];
}

export { Rilevatore, Sensore };
