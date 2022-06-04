import * as d3 from 'd3';

export type Node = {
  state: number;
  cx: number;
  cy: number;
};

export const addNode = (
  d3Node: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  node: Node[]
) => {
  const wrapper = d3Node.selectAll('g').data(node).enter().append('g');

  wrapper.each(function (d) {
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
};
