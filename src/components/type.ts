export type Transition = {
  from: string;
  to: string;
  head: string;
  headReplace: string;
  tapeDirection: string;
};

export type Inputs = number[];

export type FormData = {
  operation: string;
  data: string;
};

export type Symbol = '0' | '1' | 'B' | 'C' | 'E';

export type Direction = 'L' | 'R' | 'S';
