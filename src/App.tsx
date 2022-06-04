import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import { Node, addNode } from './components/node';
import './App.css';

function App() {
  const [data] = useState<Node[]>([
    {
      state: 0,
      cx: 100,
      cy: 100,
    },
    {
      state: 1,
      cx: 400,
      cy: 100,
    },
    {
      state: 2,
      cx: 400,
      cy: 200,
    },
    {
      state: 3,
      cx: 400,
      cy: 300,
    },
  ]);

  useEffect(() => {
    const svg = d3.select('#svg-canvas');
    svg.selectAll('*').remove();
    addNode(svg, data);
  });
  return (
    <div className="App">
      <svg id="svg-canvas" width="800" height="600"></svg>
    </div>
  );
}

export default App;
