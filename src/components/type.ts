export type Transition =
  | {
      from: number;
      to: number;
      head: String;
      headReplace: String;
      tapeDirection: String;
    }
  | undefined;
