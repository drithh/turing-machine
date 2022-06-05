import * as d3 from 'd3';
import { Graph } from '../type';

export const addNode = (
  d3Graph: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  graph: Graph
) => {
  const nodes = d3Graph.selectAll('g').data(graph.nodes).enter().append('g');

  nodes.each(function (d) {
    const g = d3.select(this);

    g.attr('class', 'node').attr('transform', `translate(${d.cx},${d.cy})`);
    g.append('circle')
      .attr('r', 40)
      .attr('class', 'fill-node stroke-orange-300 ')
      .attr('stroke-width', 3);

    g.append('text')
      .attr('y', 5)
      .attr('class', 'fill-slate-100 font-sans font-medium')
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .text('q')
      .append('tspan')
      .attr('dy', 8)
      .attr('font-size', 16)
      .text(d.state);
  });

  const links = d3Graph.selectAll('line').data(graph.links).enter().append('g');

  links.each(function (d) {
    const g = d3.select(this);
    const sourceLocation = graph.nodes.find(
      (node) => node.state === d.source.node
    );
    const targetLocation = graph.nodes.find(
      (node) => node.state === d.target.node
    );

    const sourcePort = convertPort(d.source.port);
    const targetPort = convertPort(d.target.port);

    if (sourceLocation && targetLocation) {
      g.append('line')
        .attr('class', 'stroke-gray-300')
        .attr('stroke-width', 5)
        .attr('x1', sourceLocation.cx + sourcePort.x)
        .attr('y1', sourceLocation.cy + sourcePort.y)
        .attr('x2', targetLocation.cx + targetPort.x)
        .attr('y2', targetLocation.cy + targetPort.y);

      g.append('svg')
        .attr('x', '0')
        .attr('y', -(targetLocation.cy + targetPort.y))
        .append('path')
        .attr('class', 'fill-gray-300')
        .attr('transform', 'rotate(45)')
        .attr(
          'd',
          'M272.003 266.728c-.819 0-1.638-.312-2.262-.937L256.003 252.058l-13.74 13.74c-1.25 1.25-3.275 1.25-4.525 0s-1.25-3.275 0-4.525l16-16c1.25-1.25 3.275-1.25 4.525 0l16 16c1.25 1.25 1.25 3.275 0 4.525C273.643 266.418 272.823 266.728 272.003 266.728z'
        )
        .node();

      d.content.value.forEach((value, index) => {
        g.append('text')
          .attr('class', 'fill-node font-sans font-medium')
          .attr('text-anchor', 'middle')
          .attr('font-size', 24)
          .attr('x', (sourceLocation.cx + targetLocation.cx) / 2)
          .attr('y', (sourceLocation.cy + targetLocation.cy) / 2)
          .append('tspan')
          .attr('dy', 24 * index + (d.content.offset ? d.content.offset.y : 0))
          .attr('dx', d.content.offset ? d.content.offset.x : 0)
          .attr('font-size', 16)
          .text(value);
      });
    }
  });
};

type portLocation = {
  x: number;
  y: number;
};

const convertPort = (port: string): portLocation => {
  const diagonalX = 40 * Math.cos(0.78539816339);
  const diagonalY = 40 * Math.sin(0.78539816339);
  switch (port) {
    case 'T':
      return { x: 0, y: -40 };
    case 'TR':
      return { x: diagonalX, y: -diagonalY };
    case 'R':
      return { x: 40, y: 0 };
    case 'BR':
      return { x: diagonalX, y: diagonalY };
    case 'B':
      return { x: 0, y: 40 };
    case 'BL':
      return { x: -diagonalX, y: diagonalY };
    case 'L':
      return { x: -40, y: 0 };
    case 'TL':
      return { x: -diagonalX, y: -diagonalY };
    default:
      return { x: 0, y: 0 };
  }
};
