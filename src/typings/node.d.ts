export type NodeState = 'ok' | 'rec' | 'off' | 'alert-ready' | 'alert-running';

type Node = {
  nodeID: number;
  nodeName: string;
  application: string;
  state: NodeState;
  lastSeenAt: int;
  unhandledAlertIDs: string[];
};

export default Node;
