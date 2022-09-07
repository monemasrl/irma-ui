export type NodeState = 'ok' | 'rec' | 'off' | 'alert-ready' | 'alert-running';

type Node = {
  nodeID: number;
  nodeName: string;
  applicationID: string;
  state: NodeState;
};

export default Node;
