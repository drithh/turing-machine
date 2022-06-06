import * as d3 from 'd3';
import { Graph, Port } from '../../type';
import React, { useEffect, useState } from 'react';
import { createLinks } from './links';
import { createNode } from './nodes';

export const CreateGraph: React.FC<{ diagramFileName: string }> = (
  diagramFileName
) => {
  const [data, dataSet] = useState<any>(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`diagram/${diagramFileName.diagramFileName}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      response = await response.json();
      dataSet(response);
    }

    fetchMyAPI();
  }, [diagramFileName]);

  useEffect(() => {
    if (data) {
      const svg = d3.select('#svg-canvas');
      svg.selectAll('*').remove();
      addNode(svg, data);
    }
  }, [data]);

  return (
    <>
      <svg id="svg-canvas" width="800" height="600"></svg>
    </>
  );
};

const addNode = (
  d3Graph: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  graph: Graph
) => {
  d3Graph
    .append('svg:defs')
    .append('svg:marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 7.3)
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('class', 'stroke-gray-300')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr(
      'd',
      'M3.569 1.431 6.903 4.764C6.965 4.827 7 4.911 7 5.001 7.001 5.089 6.965 5.174 6.902 5.236L3.569 8.569C3.439 8.699 3.228 8.699 3.097 8.569 2.967 8.439 2.968 8.227 3.098 8.097L6.195 4.999 3.098 1.902C3.033 1.838 3 1.752 3 1.666 3 1.581 3.033 1.495 3.098 1.431 3.227 1.301 3.439 1.301 3.569 1.431Z'
    );

  d3Graph
    .append('svg:defs')
    .append('svg:marker')
    .attr('id', 'self-arrow')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 19.5)
    .attr('refY', 5.5)
    .attr('markerUnits', 'strokeWidth')
    .attr('class', 'stroke-gray-300')
    .attr('markerWidth', 2.5)
    .attr('markerHeight', 2.5)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr(
      'd',
      'M2.899 1.666 7.329 3.277C7.412 3.308 7.479 3.37 7.517 3.451 7.555 3.53 7.559 3.623 7.528 3.706L5.916 8.135C5.853 8.308 5.662 8.397 5.488 8.334 5.315 8.271 5.226 8.079 5.289 7.906L6.787 3.79 2.671 2.292C2.585 2.261 2.519 2.197 2.483 2.119 2.447 2.042 2.44 1.95 2.472 1.865 2.534 1.692 2.726 1.603 2.899 1.666Z'
    );

  createLinks(d3Graph, graph);
  const nodes = d3Graph
    .selectAll('circle')
    .data(graph.nodes)
    .enter()
    .append('g');
  nodes.each(function (d) {
    const g = d3.select(this);
    createNode(g, d);
  });
};
