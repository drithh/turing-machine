import { Type } from './type';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Transition } from '../type';

interface Props {
  link: Type.Link;
  sourceLocation: Type.Node;
  targetLocation: Type.Node;
  active?: Transition;
  duration: number;
}

export const NormalArrow = (props: Props) => {
  const { link, sourceLocation, targetLocation, active, duration } = props;
  const sourcePort = convertPort(link.source.port);
  const targetPort = convertPort(link.target.port);

  const [isActive, setIsActive] = useState<boolean>();
  useEffect(() => {
    setIsActive(active ? true : false);
  }, [active]);

  setTimeout(() => {
    if (isActive) {
      setIsActive(false);
    }
  }, duration);

  const linkVariants = {
    active: {
      stroke: '#fdba74',
      markerEnd: 'url(#active-arrow)',
    },
    inactive: {
      stroke: '#d8b4fe',
      markerEnd: 'url(#arrow)',
    },
  };

  const textVariants = {
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0.6,
    },
  };

  return (
    <g
      className="link"
      link-source={sourceLocation.state}
      link-target={targetLocation.state}
    >
      <motion.line
        strokeWidth={4}
        x1={sourceLocation.cx + sourcePort.x}
        y1={sourceLocation.cy + sourcePort.y}
        x2={targetLocation.cx + targetPort.x}
        y2={targetLocation.cy + targetPort.y}
        variants={linkVariants}
        animate={isActive ? 'active' : 'inactive'}
       />
      <g
        className=" font-sans font-medium"
        textAnchor="middle"
        fontSize={24}
        dominantBaseline="central"
      >
        {link.content.value.map((value, index) => {
          const length = link.content.value.length;
          return (
            <motion.text
              variants={textVariants}
              animate={
                isActive && isHeadActive(active?.head, value)
                  ? 'active'
                  : 'inactive'
              }
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
            </motion.text>
          );
        })}
      </g>
    </g>
  );
};

const isHeadActive = (
  activeHead: String | undefined,
  transition: String
): boolean => {
  if (activeHead) {
    return activeHead === transition.split('/')[0].trim();
  }
  return false;
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
