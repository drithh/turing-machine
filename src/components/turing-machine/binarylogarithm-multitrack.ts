import { Transition } from '../type';
import { Strategy } from './strategy';

export class BinaryLogarithmMultiTrack implements Strategy {
  public totalTape: number = 2;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '0B':
            transition.to = 0;
            transition.headReplace = '00';
            transition.tapeDirection = 'RR';
            break;
          case '1B':
            transition.to = 0;
            transition.headReplace = '11';
            transition.tapeDirection = 'RR';
            break;
          case 'CB':
            transition.to = 1;
            transition.headReplace = 'CB';
            transition.tapeDirection = 'RL';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '01':
            transition.to = 1;
            transition.headReplace = '0B';
            transition.tapeDirection = 'RL';
            break;
          case '10':
            transition.to = 1;
            transition.headReplace = '1B';
            transition.tapeDirection = 'RL';
            break;
          case '0B':
            transition.to = 1;
            transition.headReplace = '00';
            transition.tapeDirection = 'RR';
            break;
          case '1B':
            transition.to = 1;
            transition.headReplace = '11';
            transition.tapeDirection = 'RR';
            break;
          case '00':
            transition.to = 1;
            transition.headReplace = '00';
            transition.tapeDirection = 'SR';
            break;
          case '11':
            transition.to = 1;
            transition.headReplace = '11';
            transition.tapeDirection = 'SR';

            break;
          case 'B1':
            transition.to = 2;
            transition.headReplace = 'B1';
            transition.tapeDirection = 'RR';
            break;
          case 'B0':
            transition.to = 2;
            transition.headReplace = 'B0';
            transition.tapeDirection = 'RR';
            break;
          case 'BB':
            transition.to = 2;
            transition.headReplace = 'BB';
            transition.tapeDirection = 'RR';
            break;
        }
        break;
      case 2:
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
