import { Type } from './type';
import React, { useEffect, useState } from 'react';
import { Marker } from './marker';
import { Node } from './node';
import { Link } from './link';
import { Transition } from '../type';

interface GraphProps {
  diagramFileName: string;
  activeTransition: Transition;
  duration: number;
}

export const CreateGraph = (props: GraphProps) => {
  const { diagramFileName, activeTransition, duration } = props;
  const [data, setData] = useState<Type.Graph>();

  useEffect(() => {
    async function fetchMyAPI() {
      if (diagramFileName !== 'selectoperation.json') {
        console.log(diagramFileName);
        let response = await fetch(`diagram/${diagramFileName}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          await response.json().then((data: Type.Graph) => {
            setData(data);
          });
        }
      }
    }

    fetchMyAPI();
  }, [diagramFileName]);

  return (
    <svg id="svg-canvas" width="3000" height="3000" >
      <Marker />
      {data
        ? data.nodes.map((node: Type.Node) => {
            return (
              <Node
                key={node.state}
                node={node}
                active={activeTransition}
                duration={duration / 2}
              />
            );
          })
        : null}
      {data
        ? data.links.map((link: Type.Link) => {
            return (
              <Link
                key={link.source.node + link.target.node}
                graph={data}
                link={link}
                active={activeTransition}
                duration={duration / 2}
              />
            );
          })
        : null}
    </svg>
  );
};
