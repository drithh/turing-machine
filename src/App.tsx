import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import { addNode } from './components/node';
import { Port, Graph } from './type';
import './App.css';

function App() {
  const [graph] = useState<Graph>({
    nodes: [
      {
        state: 0,
        cx: 100,
        cy: 300,
      },
      {
        state: 1,
        cx: 300,
        cy: 100,
      },
    ],
    links: [
      {
        source: { node: 0, port: Port.TopRight },
        target: { node: 1, port: Port.BottomLeft },
        content: {
          value: ['Makan Nasi', 'Makan Soto'],
        },
      },
      {
        source: { node: 3, port: Port.Top },
        target: { node: 2, port: Port.Bottom },
        content: {
          value: ['Makan Nasi', 'Makan Soto'],
        },
      },
    ],
  });

  useEffect(() => {
    const svg = d3.select('#svg-canvas');
    svg.selectAll('*').remove();
    addNode(svg, graph);
  });

  return (
    <div className="App">
      <svg id="svg-canvas" width="800" height="600"></svg>
    </div>
  );
}

export default App;
