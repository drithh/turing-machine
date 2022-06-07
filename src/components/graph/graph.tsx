import { Graph, TypeLink, TypeNode } from '../../type';
import React, { useEffect, useState } from 'react';
import { Marker } from './marker';
import { Node } from './node';
import { Link } from './link';

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
      await response.json().then((data: Graph) => {
        dataSet(data as Graph);
      });
    }

    fetchMyAPI();
  }, [diagramFileName]);

  return (
    <svg id="svg-canvas" width="1000" height="600">
      <Marker />
      {data
        ? data.nodes.map((node: TypeNode) => {
            return <Node key={node.state} node={node} />;
          })
        : null}
      {data
        ? data.links.map((link: TypeLink) => {
            return (
              <Link
                key={link.source.node + link.target.node}
                graph={data}
                link={link}
              />
            );
          })
        : null}
    </svg>
  );
};
