type Reading = {
  nodeID: number;
  canID: number;
  sensorNumber: number;
  readingID: number;
  sessionID: number;
  dangerLevel: number;
  window1: number;
  window2: number;
  window3: number;
  publishedAt: string;
};

export default Reading;
