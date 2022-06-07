export type TypeNode = {
  state: number;
  cx: number;
  cy: number;
  type: 'start' | 'normal' | 'final';
};

type LinkTarget = {
  node: number;
  port: 'T' | 'TR' | 'R' | 'BR' | 'B' | 'BL' | 'L' | 'TL';
};

type LinkContent = {
  value: string[];
  offset?: {
    x: number;
    y: number;
  };
};

export type TypeLink = {
  source: LinkTarget;
  target: LinkTarget;
  content: LinkContent;
};

export type Graph = {
  nodes: TypeNode[];
  links: TypeLink[];
};
