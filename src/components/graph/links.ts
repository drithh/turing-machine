import * as d3 from 'd3';
import { Graph } from '../../type';

export const createLinks = (
  d3Graph: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  graph: Graph
) => {
  const links = d3Graph
    .selectAll('line')
    .data(graph.links)
    .enter()
    .append('g')
    .attr('class', 'link');

  links.each(function (d) {
    const g = d3.select(this);
    const sourceLocation = graph.nodes.find(
      (node) => node.state === d.source.node
    );
    const targetLocation = graph.nodes.find(
      (node) => node.state === d.target.node
    );

    if (sourceLocation && targetLocation) {
      if (sourceLocation === targetLocation) {
        const selfArrowPosition = getSelfLink(d.source.port);

        const arcGenerator = d3.arc();
        g.append('path')
          .attr(
            'transform',
            `translate(${sourceLocation.cx + selfArrowPosition.offset.x},${
              sourceLocation.cy + selfArrowPosition.offset.y
            })`
          )
          .attr(
            'd',
            arcGenerator({
              innerRadius: 26.5,
              outerRadius: 30,
              startAngle: -Math.PI / 1.2 + selfArrowPosition.angle,
              endAngle: Math.PI / 1.2 + selfArrowPosition.angle,
            })
          )
          .attr('class', 'fill-gray-300')
          .attr('stroke-width', '10')
          .attr('marker-start', 'url(#self-arrow)');

        d.content.value.forEach((value, index) => {
          g.append('text')
            .attr('class', 'fill-node font-sans font-medium')
            .attr('text-anchor', 'middle')
            .attr('font-size', 24)
            .attr('x', (sourceLocation.cx + targetLocation.cx) / 2)
            .attr('y', (sourceLocation.cy + targetLocation.cy) / 2)
            .append('tspan')
            .attr(
              'dy',
              24 * index +
                selfArrowPosition.offset.y * 1.5 +
                -5 +
                (d.content.offset ? d.content.offset.y : 0)
            )
            .attr(
              'dx',
              selfArrowPosition.offset.x * 1.8 +
                (d.content.offset ? d.content.offset.x : 0)
            )
            .attr('font-size', 16)
            .text(value);
        });
      } else {
        const sourcePort = convertPort(d.source.port);
        const targetPort = convertPort(d.target.port);
        g.append('line')
          .attr('class', 'stroke-gray-300')
          .attr('stroke-width', 4)
          .attr('x1', sourceLocation.cx + sourcePort.x)
          .attr('y1', sourceLocation.cy + sourcePort.y)
          .attr('x2', targetLocation.cx + targetPort.x)
          .attr('y2', targetLocation.cy + targetPort.y)
          .attr('marker-end', 'url(#arrow)');

        d.content.value.forEach((value, index) => {
          g.append('text')
            .attr('class', 'fill-node font-sans font-medium')
            .attr('text-anchor', 'middle')
            .attr('font-size', 24)
            .attr('x', (sourceLocation.cx + targetLocation.cx) / 2)
            .attr('y', (sourceLocation.cy + targetLocation.cy) / 2)
            .append('tspan')
            .attr(
              'dy',
              24 * index + (d.content.offset ? d.content.offset.y : 0)
            )
            .attr('dx', d.content.offset ? d.content.offset.x : 0)
            .attr('font-size', 16)
            .text(value);
        });
      }
    }
  });
};

type portLocation = {
  x: number;
  y: number;
};

type selfArrowLocation = {
  offset: {
    x: number;
    y: number;
  };
  angle: number;
};

const getSelfLink = (port: string): selfArrowLocation => {
  switch (port) {
    case 'T':
      return {
        offset: {
          x: 0,
          y: -62,
        },
        angle: 0,
      };
    case 'R':
      return {
        offset: {
          x: 62,
          y: 0,
        },
        angle: 1.55,
      };
    case 'B':
      return {
        offset: {
          x: 0,
          y: 62,
        },
        angle: -3.1,
      };
    case 'L':
      return {
        offset: {
          x: -62,
          y: 0,
        },
        angle: -1.55,
      };

    default:
      return {
        offset: {
          x: -60,
          y: 0,
        },
        angle: -1.2,
      };
  }
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
