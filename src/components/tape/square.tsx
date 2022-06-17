import TextTransition, { presets } from 'react-text-transition';

type TapeData = {
  id: number;
  value: string;
};

export const Square = (props: { position: TapeData }) => {
  const { position } = props;

  return (
    <div className="relative w-16 h-16 border-l-0 border-primary-meadow border-2">
      <div className="absolute right-1 top-[-2px] opacity-90 font-medium font-sans">
        {position.id}
      </div>
      <div className="relative flex place-content-center  place-items-center h-full text-3xl opacity-90 font-medium font-sans text-primary-blue">
        <TextTransition
          noOverflow={true}
          text={position.value}
          springConfig={presets.wobbly}
        />
      </div>
    </div>
  );
};
