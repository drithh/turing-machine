import { Type } from './type';
import React, { useEffect, useState } from 'react';
import { Marker } from './marker';
import { Node } from './node';
import { Link } from './link';
import { Transition } from '../type';

interface GraphProps {
  diagramFileName: string;
  steps?: Transition[];
}

export const CreateGraph = (props: GraphProps) => {
  const { diagramFileName, steps } = props;
  const [data, dataSet] = useState<any>(null);

  const [activeTransition, setActiveTransition] = useState<Transition>();

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (steps) {
        setActiveTransition(steps[step]);
        setStep(step + 1);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [steps, step]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`diagram/${diagramFileName}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      await response.json().then((data: Type.Graph) => {
        dataSet(data as Type.Graph);
      });
    }

    fetchMyAPI();
  }, [diagramFileName]);

  return (
    <svg id="svg-canvas" width="1000" height="600">
      <Marker />
      {data
        ? data.nodes.map((node: Type.Node) => {
            return (
              <Node key={node.state} node={node} active={activeTransition} />
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
              />
            );
          })
        : null}
    </svg>
  );
};
