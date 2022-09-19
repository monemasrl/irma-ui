type Reading = {
  nodeID: number;
  canID: number;
  sensorNumber: number;
  readingID: number;
  sessionID: number;
  dangerLevel: number;
  window1Count: number;
  window2Count: number;
  window3Count: number;
  publishedAt: string;
};

export default Reading;
