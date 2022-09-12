export type TotalReading = {
  nodeID: number;
  canID: string;
  sensorNumber: string;
  readingID: number;
  sessionID: number;
  dangerLevel: number;
  totalCount: number;
  publishedAt: string;
};

export type WindowReading = {
  nodeID: number;
  canID: string;
  sensorNumber: string;
  readingID: number;
  sessionID: number;
  windowNumber: number;
  count: number;
  publishedAt: string;
};
