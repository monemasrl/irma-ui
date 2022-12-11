export type SensorSettings = {
  hv?: number;
  w1_low?: number;
  w1_high?: number;
  w2_low?: number;
  w2_high?: number;
  w3_low?: number;
  w3_high?: number;
};

export type DetectorSettings = {
  s1?: SensorSettings;
  s2?: SensorSettings;
};

export type NodeSettings = {
  d1?: DetectorSettings;
  d2?: DetectorSettings;
  d3?: DetectorSettings;
  d4?: DetectorSettings;
};
