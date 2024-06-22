import { Direction, Symbol } from '../components/type';

export const resolveSymbol = (inputs: string): Symbol[] => {
  const inputstring = new Array<Symbol>();
  for (let i = 0; i < inputs.length; i++) {
    const symbol = inputs[i];
    // check if symbol is not a valid symbol
    if (!['0', '1', 'B', 'C', 'E'].includes(symbol)) {
      throw new Error('Invalid symbol');
    }
    inputstring.push(symbol as Symbol);
  }
  return inputstring;
};

export const resolveDirection = (direction: string): Direction[] => {
  const directions = new Array<Direction>();
  for (let i = 0; i < direction.length; i++) {
    const d = direction[i];
    if (!['L', 'R', 'S'].includes(d)) {
      throw new Error('Invalid direction');
    }
    directions.push(d as Direction);
  }

  return directions;
};
