export type Transition = {
  from: number;
  to: number;
  head: string;
  headReplace: string;
  tapeDirection: string;
};

export type Inputs = number[];

export type Temperature = {
  temperature: number;
  from: string;
  to: string;
};

export type FormData = {
  operation: string;
  data: any;
};

export type Symbol = '0' | '1' | 'B' | 'C' | 'E';

export type Direction = 'L' | 'R' | 'S';
