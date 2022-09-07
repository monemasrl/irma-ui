export type NodeState = 'ok' | 'rec' | 'off' | 'alert-ready' | 'alert-running';

type Node = {
  nodeID: number;
  nodeName: string;
  applicationID: string;
  state: NodeState;
  unhandledAlertIDs: string[];
};

export default Node;
