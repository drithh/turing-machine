export type Node = {
  state: number;
  cx: number;
  cy: number;
};

export enum Port {
  Top = 'T',
  TopRight = 'TR',
  Right = 'R',
  BottomRight = 'BR',
  Bottom = 'B',
  BottomLeft = 'BL',
  Left = 'L',
  TopLeft = 'TL',
}

type Link = {
  node: number;
  port: Port;
};

type LinkContent = {
  value: string[];
  offset?: {
    x: number;
    y: number;
  };
};

export type Links = {
  source: Link;
  target: Link;
  content: LinkContent;
};

export type Graph = {
  nodes: Node[];
  links: Links[];
};
