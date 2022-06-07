import { Graph, TypeLink } from '../../type';
import { NormalArrow } from './normal-arrow';
import { SelfArrow } from './self-arrow';

export const Link = (props: { graph: Graph; link: TypeLink }) => {
  const { graph, link } = props;

  const sourceLocation = graph.nodes.find(
    (node) => node.state === link.source.node
  );
  const targetLocation = graph.nodes.find(
    (node) => node.state === link.target.node
  );

  return (
    <>
      {sourceLocation && targetLocation ? (
        sourceLocation === targetLocation ? (
          <SelfArrow
            key={link.source.node + link.target.node}
            link={link}
            sourceLocation={sourceLocation}
          />
        ) : (
          <NormalArrow
            key={link.source.node + link.target.node}
            link={link}
            sourceLocation={sourceLocation}
            targetLocation={targetLocation}
          />
        )
      ) : null}
    </>
  );
};
