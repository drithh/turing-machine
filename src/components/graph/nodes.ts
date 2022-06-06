import * as d3 from 'd3';
import { Node } from '../../type';

export const createNode = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  node: Node
) => {
  g.attr('class', 'node').attr('transform', `translate(${node.cx},${node.cy})`);
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
    .text(node.state);
};
