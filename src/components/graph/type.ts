export namespace Type {
  export type Node = {
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

  export type Link = {
    source: LinkTarget;
    target: LinkTarget;
    content: LinkContent;
  };

  export type Graph = {
    totalTape: number;
    nodes: Node[];
    links: Link[];
  };
}
