const CommandType = {
  START_REC: 0,
  END_REC: 1,
  SET_DEMO_1: 2,
  SET_DEMO_2: 3,
} as const;

type CommandType = typeof CommandType[keyof typeof CommandType];

export default CommandType;
