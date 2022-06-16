import { Type } from './type';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Transition } from '../type';

interface Props {
  link: Type.Link;
  sourceLocation: Type.Node;
  active: Transition | undefined;
  duration: number;
}

export const SelfArrow = (props: Props) => {
  const { link, sourceLocation, active, duration } = props;

  const selfArrowPosition = getSelfLink(link.source.port);
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
      fill: '#fdba74',
      markerEnd: 'url(#active-self-arrow)',
    },
    inactive: {
      fill: '#d8b4fe',
      markerEnd: 'url(#self-arrow)',
    },
  };

  const textVariants = {
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0.7,
    },
  };

  return (
    <g
      className="link"
      link-source={sourceLocation.state}
      link-target={sourceLocation.state}
      transform={`translate(${sourceLocation.cx + selfArrowPosition.offset.x},${
        sourceLocation.cy + selfArrowPosition.offset.y
      })`}
    >
      <motion.path
        variants={linkVariants}
        animate={isActive ? 'active' : 'inactive'}
        strokeWidth={10}
        d="M16.067324553301635,-25.33458272201992A30,30,0,1,1,-13.906729954896745,-26.582002595018636L-12.284278126825457,-23.48076895893313A26.5,26.5,0,1,0,14.192803355416446,-22.37888140445093Z"
        transform={`rotate(${selfArrowPosition.rotation})`}
      ></motion.path>
      <g
        className="fill-primary-indigo font-sans font-medium"
        textAnchor="middle"
        fontSize={24}
        alignmentBaseline="central"
      >
        {link.content.value.map((value, index) => (
          <motion.text
            variants={textVariants}
            animate={
              isActive && isHeadActive(active?.head, value)
                ? 'active'
                : 'inactive'
            }
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
          </motion.text>
        ))}
      </g>
    </g>
  );
};

const isHeadActive = (
  activeHead: string | undefined,
  transition: string
): boolean => {
  if (activeHead) {
    return activeHead === transition.split('/')[0].trim();
  }
  return false;
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
