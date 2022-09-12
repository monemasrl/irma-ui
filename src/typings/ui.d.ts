type Sensore = {
  canID: string;
  dangerLevel: number;
  nodeID: number;
  publishedAt: string;
  readingID: number;
  sensorNumber: string;
  sessionID: number;
  window1_count: number;
  window2_count: number;
  window3_count: number;
};
interface Rilevatore {
  id: number;
  sensore1: Sensore[];
  sensore2: Sensore[];
}

export { Rilevatore, Sensore };
