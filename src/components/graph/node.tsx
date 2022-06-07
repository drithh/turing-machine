import { TypeNode } from '../../type';

export const Node = (props: { node: TypeNode }) => {
  const { node } = props;
  const translate = `translate(${node.cx}, ${node.cy})`;
  return (
    <g transform={translate}>
      <circle r={40} className="fill-node stroke-purple-300" strokeWidth={3} />
      <text
        y={-8}
        className="fill-slate-100 font-sans font-medium"
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
