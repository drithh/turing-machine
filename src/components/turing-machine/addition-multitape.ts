import { Transition } from '../type';
import { Strategy } from './strategy';

const transitions = `
  (0, 0B): (1, 0B, RL)
  (0, 1B): (1, 1B, RL)
  (0, CB): (1, CB, RL)
  (1, 01): (1, 0B, RL)
  (1, 10): (1, 1B, RL)
  (1, 0B): (1, 00, RR)
  (1, 1B): (1, 11, RR)
  (1, 00): (1, 00, SR)
  (1, 11): (1, 11, SR)
  (1, B1): (2, B1, RR)
  (1, B0): (2, B0, RR)
  (1, BB): (2, BB, RR)
`;

interface TransitionBuild {
  [state: string]: {
    [head: string]: {
      to: string;
      replace: string;
      direction: string;
    };
  };
}

import { ZodError, object, string, record, tuple, ZodSchema } from 'zod';

function parseTransitions(transitionString: string): TransitionBuild {
  let totalTape;
  try {
    // regex
    // split string by new line
    const parsedTransitions: TransitionBuild = {};

    const transitions = transitionString.split('\n');
    for (const [index, transition] of transitions.entries()) {
      if (transition.length > 0) {
        const transitionRegex =
          /\((\w+),\s*([^)]+)\):\s*\((\w+),\s*([^,]+),\s*([^)]+)\)/g;
        const match = transitionRegex.exec(transition);
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

        if (totalTape === undefined) {
          totalTape = head.length;
        } else if (totalTape !== head.length) {
          throw new Error(
            `The total tape must be the same for all transitions, at line ${
              index + 1
            }`
          );
        }

        if (!parsedTransitions[from]) {
          parsedTransitions[from] = {};
        }
        parsedTransitions[from][head] = {
          to,
          replace: headReplace,
          direction: tapeDirection,
        };
      }
    }

    console.log(parsedTransitions);

    return parsedTransitions;
  } catch (error) {
    throw error;
  }
}

export class AdditionMultiTape implements Strategy {
  constructor() {
    const parsedTransitions = parseTransitions(transitions);
    console.log(parsedTransitions);
  }
  public totalTape: number = 2;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case '0':
        switch (transition.head) {
          case '0B':
            transition.to = '0';
            transition.headReplace = '00';
            transition.tapeDirection = 'RR';
            break;
          case '1B':
            transition.to = '0';
            transition.headReplace = '11';
            transition.tapeDirection = 'RR';
            break;
          case 'CB':
            transition.to = '1';
            transition.headReplace = 'CB';
            transition.tapeDirection = 'RL';
            break;
        }
        break;
      case '1':
        switch (transition.head) {
          case '01':
            transition.to = '1';
            transition.headReplace = '0B';
            transition.tapeDirection = 'RL';
            break;
          case '10':
            transition.to = '1';
            transition.headReplace = '1B';
            transition.tapeDirection = 'RL';
            break;
          case '0B':
            transition.to = '1';
            transition.headReplace = '00';
            transition.tapeDirection = 'RR';
            break;
          case '1B':
            transition.to = '1';
            transition.headReplace = '11';
            transition.tapeDirection = 'RR';
            break;
          case '00':
            transition.to = '1';
            transition.headReplace = '00';
            transition.tapeDirection = 'SR';
            break;
          case '11':
            transition.to = '1';
            transition.headReplace = '11';
            transition.tapeDirection = 'SR';
            break;
          case 'B1':
            transition.to = '2';
            transition.headReplace = 'B1';
            transition.tapeDirection = 'RR';
            break;
          case 'B0':
            transition.to = '2';
            transition.headReplace = 'B0';
            transition.tapeDirection = 'RR';
            break;
          case 'BB':
            transition.to = '2';
            transition.headReplace = 'BB';
            transition.tapeDirection = 'RR';
            break;
        }
        break;
      case '2':
        break;
    }
    return transition.to === '-1' ? undefined : transition;
  };
}
