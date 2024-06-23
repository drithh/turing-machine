import { Transition } from '../type';

interface StrategyTransition {
  [state: string]: {
    [head: string]: {
      to: string;
      replace: string;
      direction: string;
    };
  };
}
export class Strategy {
  constructor(public strategy: StrategyTransition, public totalTape: number) {
    console.log(strategy, totalTape);
    this.strategy = strategy;
    this.totalTape = totalTape;
  }
  public getNextTransition(transition: Transition): Transition | undefined {
    const state = this.strategy[transition.from];
    if (state) {
      const head = state[transition.head];
      if (head) {
        transition.to = head.to;
        transition.headReplace = head.replace;
        transition.tapeDirection = head.direction;
        console.log(transition);
        return transition;
      }
    }
    return undefined;
  }
}

export function parseStrategy(strategyString: string): Strategy {
  let totalTape = -1;
  try {
    const parsedStrategies: StrategyTransition = {};

    const strategies = strategyString.split('\n');
    for (const [index, strategy] of strategies.entries()) {
      const strategyTrimmed = strategy.trim();
      if (strategyTrimmed.length > 0) {
        const strategyRegex =
          /\((\w+),\s*([^)]+)\):\s*\((\w+),\s*([^,]+),\s*([^)]+)\)/g;
        const match = strategyRegex.exec(strategyTrimmed);
        if (!match) {
          throw new Error(`Invalid transition at line ${index + 1}`);
        }

        const [_, from, head, to, headReplace, tapeDirection] = match;
        if (!from || !head || !to || !headReplace || !tapeDirection) {
          throw new Error(`Invalid transition at line ${index + 1}`);
        }

        if (
          head.length !== headReplace.length ||
          headReplace.length !== tapeDirection.length
        ) {
          throw new Error(
            `The length of head (${head.length}), headReplace (${
              headReplace.length
            }) and tapeDirection (${
              tapeDirection.length
            }) must be the same, at line ${index + 1}`
          );
        }

        if (totalTape === -1) {
          totalTape = head.length;
        } else if (totalTape !== head.length) {
          throw new Error(
            `The total tape must be the same for all transitions, at line ${
              index + 1
            }`
          );
        }

        if (!parsedStrategies[from]) {
          parsedStrategies[from] = {};
        }
        parsedStrategies[from][head] = {
          to,
          replace: headReplace,
          direction: tapeDirection,
        };
      }
    }

    const strategy = new Strategy(parsedStrategies, totalTape);

    return strategy;
  } catch (error) {
    throw error;
  }
}
