import { Type } from './type';
import { motion } from 'framer-motion';
import { Transition } from '../type';
export const Node = (props: {
  node: Type.Node;
  active: Transition | undefined;
}) => {
  const { node, active } = props;
  const translate = `translate(${node.cx}, ${node.cy})`;
  const variants = {
    active: {
      fill: ['#2D3748', '#1F5F77'],
      stroke: ['#fdba74', '#d8b4fe'],
    },
    inactive: {
      fill: '#1F5F77',
      stroke: '#d8b4fe',
    },
  };

  const transition = {
    duration: 2,
    times: [0, 1],
  };

  return (
    <g className="node" node-state={node.state} transform={translate}>
      <motion.circle
        r={40}
        strokeWidth={3}
        variants={variants}
        animate={active?.from === node.state ? 'active' : 'inactive'}
        transition={transition}
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
