export type Transition =
  | {
      from: number;
      to: number;
      head: String;
      headReplace: String;
      tapeDirection: String;
    }
  | undefined;

export type TwoInput = {
  input1: number;
  input2: number;
};

export type Temperature = {
  temperature: number;
  from: string;
  to: string;
};

export type FormData = {
  operation: string;
  data: any;
  actionType: any;
  duration?: number;
};

export type Symbol =
  | '0'
  | '1'
  | 'B'
  | 'C'
  | 'E'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'O'
  | 'P';

export type Direction = 'L' | 'R' | 'S';
