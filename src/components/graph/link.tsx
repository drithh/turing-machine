import { Type } from './type';
import { NormalArrow } from './normal-arrow';
import { SelfArrow } from './self-arrow';

interface Props {
  graph: Type.Graph;
  link: Type.Link;
  activeNode: {
    from?: number;
    to?: number;
  };
  activeHead?: String;
}

export const Link = (props: Props) => {
  const { graph, link, activeNode, activeHead } = props;

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
            active={isActive(activeNode, link)}
            activeHead={activeHead}
          />
        ) : (
          <NormalArrow
            key={link.source.node + link.target.node}
            link={link}
            sourceLocation={sourceLocation}
            targetLocation={targetLocation}
            active={isActive(activeNode, link)}
            activeHead={activeHead}
          />
        )
      ) : null}
    </>
  );
};

const isActive = (
  activeNode: { from?: number; to?: number },
  link: Type.Link
) => {
  return (
    activeNode?.from === link.source.node && activeNode?.to === link.target.node
  );
};
