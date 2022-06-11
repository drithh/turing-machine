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
  operation: string | undefined;
  data: any;
  actionType: any;
  duration?: number;
};
