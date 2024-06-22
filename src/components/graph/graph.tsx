import { Type } from './type';
import React, { useEffect, useRef, useState } from 'react';
import { Marker } from './marker';
import { Node } from './node';
import { Link } from './link';
import { Transition } from '../type';
import { useDraggable } from 'react-use-draggable-scroll';

interface GraphProps {
  diagramFileName: string;
  activeTransition?: Transition;
  duration: number;
}

type Size = {
  width: number;
  height: number;
};

export const CreateGraph = (props: GraphProps) => {
  const { diagramFileName, activeTransition, duration } = props;
  const [data, setData] = useState<Type.Graph>();

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const [size, setSize] = useState<Size>({ width: 0, height: 0 } as Size);

  const [emptyFile, setEmptyFile] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const width = data.nodes.reduce(
        (acc, node) => Math.max(acc, node.cx + 150),
        0
      );
      const height = data.nodes.reduce(
        (acc, node) => Math.max(acc, node.cy + 150),
        0
      );
      setSize({ width, height });
    }
  }, [data]);

  useEffect(() => {
    async function fetchMyAPI() {
      if (diagramFileName !== 'selectoperation.json') {
        // chcek if file json
        let response = await fetch(`diagram/${diagramFileName}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          setEmptyFile(false);
          await response.json().then((data: Type.Graph) => {
            setData(data);
          });
        }
        if (response.status === 404) {
          setEmptyFile(true);
          console.log('404');
        }
      }
    }

    fetchMyAPI();
  }, [diagramFileName]);

  return (
    <div
      {...events}
      ref={ref}
      className="overflow-scroll h-fit w-fit max-h-[40rem] max-w-[1366px] scrollbar-hide"
    >
      {!emptyFile ? (
        <svg
          id="svg-canvas"
          width={size.width}
          height={size.height + 100}
          viewBox={`0 0 ${size.width} ${size.height + 100}`}
        >
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
                    key={
                      link.source.node +
                      link.target.node +
                      link.source.port +
                      link.content.value[0]
                    }
                    totalTape={data.totalTape}
                    graph={data}
                    link={link}
                    active={activeTransition}
                    duration={duration / 2}
                  />
                );
              })
            : null}
        </svg>
      ) : (
        <div className="text-center flex place-content-center w-full h-full place-items-center absolute inset-0">
          <div className="text-2xl">Nah bro it's too big to draw 💀💀</div>
        </div>
      )}
    </div>
  );
};
