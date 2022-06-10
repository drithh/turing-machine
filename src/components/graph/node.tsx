import { Type } from './type';
import { motion } from 'framer-motion';
import { Transition } from '../type';
import { useEffect, useState } from 'react';
export const Node = (props: {
  node: Type.Node;
  active: Transition | undefined;
  duration: number;
}) => {
  const { node, active, duration } = props;
  const translate = `translate(${node.cx}, ${node.cy})`;
  const variants = {
    active: {
      fill: '#2D3748',
      stroke: '#fdba74',
    },
    inactive: {
      fill: '#1F5F77',
      stroke: '#d8b4fe',
    },
  };

  const [variant, setVariant] = useState<'active' | 'inactive'>('inactive');

  useEffect(() => {
    if (active?.from === node.state || active?.to === node.state) {
      setVariant('active');
    }
  }, [active, node]);

  useEffect(() => {
    setTimeout(() => {
      if (variant === 'active') {
        setVariant('inactive');
      }
    }, duration);
  });

  return (
    <g className="node" node-state={node.state} transform={translate}>
      <motion.circle
        r={40}
        strokeWidth={3}
        variants={variants}
        animate={variant}
      />
      <text
        y={-8}
        className="fill-slate-100 font-sans  font-medium"
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={24}
      >
        q
        <tspan dy={18} fontSize={16}>
          {node.state}
        </tspan>
      </text>
    </g>
  );
};
