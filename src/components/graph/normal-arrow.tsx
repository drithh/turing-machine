import { TypeLink, TypeNode } from '../../type';

export const NormalArrow = (props: {
  link: TypeLink;
  sourceLocation: TypeNode;
  targetLocation: TypeNode;
}) => {
  const { link, sourceLocation, targetLocation } = props;
  const sourcePort = convertPort(link.source.port);
  const targetPort = convertPort(link.target.port);
  console.log(sourceLocation, targetLocation);
  return (
    <g>
      <line
        strokeWidth={4}
        x1={sourceLocation.cx + sourcePort.x}
        y1={sourceLocation.cy + sourcePort.y}
        x2={targetLocation.cx + targetPort.x}
        y2={targetLocation.cy + targetPort.y}
        markerEnd="url(#arrow)"
        className="stroke-purple-300"
      ></line>
      <g
        className="fill-node font-sans font-medium"
        textAnchor="middle"
        fontSize={24}
        dominantBaseline="central"
      >
        {link.content.value.map((value, index) => {
          const length = link.content.value.length;
          return (
            <text
              key={index}
              x={(sourceLocation.cx + targetLocation.cx) / 2}
              y={(sourceLocation.cy + targetLocation.cy) / 2}
              dy={
                (length > 1 ? length * -6 : -12) +
                24 * index +
                (link.content.offset ? link.content.offset.y : 0)
              }
              fontSize={16}
              textLength="5em"
              fontWeight="bold"
            >
              {value}
            </text>
          );
        })}
      </g>
    </g>
  );
};

type portLocation = {
  x: number;
  y: number;
};

const convertPort = (port: string): portLocation => {
  const diagonalX = 40 * Math.cos(0.78539816339);
  const diagonalY = 40 * Math.sin(0.78539816339);
  switch (port) {
    case 'T':
      return { x: 0, y: -40 };
    case 'TR':
      return { x: diagonalX, y: -diagonalY };
    case 'R':
      return { x: 40, y: 0 };
    case 'BR':
      return { x: diagonalX, y: diagonalY };
    case 'B':
      return { x: 0, y: 40 };
    case 'BL':
      return { x: -diagonalX, y: diagonalY };
    case 'L':
      return { x: -40, y: 0 };
    case 'TL':
      return { x: -diagonalX, y: -diagonalY };
    default:
      return { x: 0, y: 0 };
  }
};
