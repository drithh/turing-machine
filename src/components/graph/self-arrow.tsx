import { TypeLink, TypeNode } from '../../type';

export const SelfArrow = (props: {
  link: TypeLink;
  sourceLocation: TypeNode;
}) => {
  const { link, sourceLocation } = props;

  const selfArrowPosition = getSelfLink(link.source.port);

  return (
    <g
      transform={`translate(${sourceLocation.cx + selfArrowPosition.offset.x},${
        sourceLocation.cy + selfArrowPosition.offset.y
      })`}
    >
      <path
        markerEnd="url(#self-arrow)"
        strokeWidth={10}
        className="fill-purple-300 "
        d="M16.067324553301635,-25.33458272201992A30,30,0,1,1,-13.906729954896745,-26.582002595018636L-12.284278126825457,-23.48076895893313A26.5,26.5,0,1,0,14.192803355416446,-22.37888140445093Z"
        transform={`rotate(${selfArrowPosition.rotation})`}
      ></path>
      <g
        className="fill-node font-sans font-medium"
        textAnchor="middle"
        fontSize={24}
        alignmentBaseline="central"
      >
        {link.content.value.map((value, index) => (
          <text
            key={index}
            x={0}
            y={0}
            dx={
              selfArrowPosition.offset.x * 1.8 +
              (link.content.offset ? link.content.offset.x : 0)
            }
            dy={
              24 * index +
              selfArrowPosition.offset.y * 1.5 +
              -65 +
              (link.content.offset ? link.content.offset.y : 0)
            }
            fontSize={16}
            textLength="5em"
            fontWeight="bold"
          >
            {value}
          </text>
        ))}
      </g>
    </g>
  );
};

type selfArrowLocation = {
  offset: {
    x: number;
    y: number;
  };
  rotation: number;
};

const getSelfLink = (port: string): selfArrowLocation => {
  switch (port) {
    case 'T':
      return {
        offset: {
          x: 0,
          y: -62,
        },
        rotation: 180,
      };
    case 'R':
      return {
        offset: {
          x: 62,
          y: 0,
        },
        rotation: 270,
      };
    case 'B':
      return {
        offset: {
          x: 0,
          y: 62,
        },
        rotation: 0,
      };
    case 'L':
      return {
        offset: {
          x: -62,
          y: 0,
        },
        rotation: 90,
      };

    default:
      return {
        offset: {
          x: -60,
          y: 0,
        },
        rotation: -1.2,
      };
  }
};
