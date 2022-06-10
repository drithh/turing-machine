export const Square = (props: { position: number; blur: string }) => {
  const { position, blur } = props;
  return (
    <div
      className="relative w-16 h-16 border-l-0 border-primary-meadow border-2"
      style={
        blur === 'left'
          ? {
              WebkitMaskImage:
                '-webkit-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1))',
              maskImage:
                'linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1))',
            }
          : blur === 'right'
          ? {
              WebkitMaskImage:
                '-webkit-linear-gradient(right, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1))',
              maskImage:
                'linear-gradient(right, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1))',
            }
          : {}
      }
    >
      <div className="absolute right-1 top-[-2px] opacity-90 font-medium font-sans">
        {position}
      </div>
    </div>
  );
};
