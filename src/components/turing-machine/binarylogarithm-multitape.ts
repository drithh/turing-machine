import { Transition } from '../type';
import { Strategy } from './strategy';

export class BinaryLogarithmMultiTape implements Strategy {
  public totalTape: number = 3;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '1BB':
            transition.to = 1;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '1BB':
            transition.to = 2;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RSS';
            break;

          case 'BBB':
            transition.to = 4;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'LLS';
            break;
          case 'EBB':
            transition.to = 4;
            transition.headReplace = 'EBB';
            transition.tapeDirection = 'LLS';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case '1BB':
            transition.to = 1;
            transition.headReplace = '11B';
            transition.tapeDirection = 'RRS';
            break;

          case 'BBB':
            transition.to = 3;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'EBB':
            transition.to = 3;
            transition.headReplace = 'EBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 3:
        switch (transition.head) {
          case '1BB':
            transition.to = 4;
            transition.headReplace = 'EBB';
            transition.tapeDirection = 'LLS';
            break;
        }
        break;
      case 4:
        switch (transition.head) {
          case '11B':
            transition.to = 5;
            transition.headReplace = 'EB1';
            transition.tapeDirection = 'LLR';
            break;
          case 'BBB':
            transition.to = 5;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRS';
            break;
          case 'EBB':
            transition.to = 5;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case '11B':
            transition.to = 5;
            transition.headReplace = 'EBB';
            transition.tapeDirection = 'LLS';
            break;
          case '1BB':
            transition.to = 5;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'LSS';
            break;

          case 'BBB':
            transition.to = 6;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRS';
            break;
          case 'EBB':
            transition.to = 6;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 6:
        switch (transition.head) {
          case '1BB':
            transition.to = 1;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'SSS';
            break;

          case 'BBB':
            transition.to = 7;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'EBB':
            transition.to = 7;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 7:
        switch (transition.head) {
          case 'EBB':
            transition.to = 7;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
