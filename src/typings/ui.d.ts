import Reading from './reading';

interface Rilevatore {
  id: number;
  sensore1: Reading[];
  sensore2: Reading[];
}

export { Rilevatore, Sensore };
