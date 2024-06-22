import { Transition } from '../type';
import { Strategy } from './strategy';

export class DivisionMultiTape implements Strategy {
  public totalTape: number = 3;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '0BB':
            transition.to = 0;
            transition.headReplace = '00B';
            transition.tapeDirection = 'RRS';
            break;
          case '1BB':
            transition.to = 0;
            transition.headReplace = '11B';
            transition.tapeDirection = 'RRS';
            break;
          case 'CBB':
            transition.to = 1;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'RLS';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '11B':
            transition.to = 1;
            transition.headReplace = '11B';
            transition.tapeDirection = 'RLS';
            break;
          case '01B':
            transition.to = 1;
            transition.headReplace = '01B';
            transition.tapeDirection = 'RLS';
            break;
          case '10B':
            transition.to = 1;
            transition.headReplace = '10B';
            transition.tapeDirection = 'RLS';
            break;
          case '00B':
            transition.to = 1;
            transition.headReplace = '00B';
            transition.tapeDirection = 'RLS';
            break;

          case 'B1B':
            transition.to = 2;
            transition.headReplace = 'B1B';
            transition.tapeDirection = 'LSS';
            break;
          case 'B0B':
            transition.to = 2;
            transition.headReplace = 'B0B';
            transition.tapeDirection = 'LSS';
            break;

          case 'BBB':
            transition.to = 5;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'LRS';
            break;
          case '1BB':
            transition.to = 5;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'SSS';
            break;
          case '0BB':
            transition.to = 5;
            transition.headReplace = '0BB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case '11B':
            transition.to = 3;
            transition.headReplace = '111';
            transition.tapeDirection = 'SSR';
            break;
          case '01B':
            transition.to = 3;
            transition.headReplace = '010';
            transition.tapeDirection = 'SSR';
            break;
          case '10B':
            transition.to = 3;
            transition.headReplace = '100';
            transition.tapeDirection = 'SSR';
            break;
          case '00B':
            transition.to = 3;
            transition.headReplace = '001';
            transition.tapeDirection = 'SSR';
            break;

          case 'C0B':
            transition.to = 5;
            transition.headReplace = 'C0B';
            transition.tapeDirection = 'SSS';
            break;
          case 'C1B':
            transition.to = 5;
            transition.headReplace = 'C1B';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 3:
        switch (transition.head) {
          case '11B':
            transition.to = 3;
            transition.headReplace = '11B';
            transition.tapeDirection = 'LLS';
            break;
          case '01B':
            transition.to = 3;
            transition.headReplace = '01B';
            transition.tapeDirection = 'LLS';
            break;
          case '10B':
            transition.to = 3;
            transition.headReplace = '10B';
            transition.tapeDirection = 'LLS';
            break;
          case '00B':
            transition.to = 3;
            transition.headReplace = '00B';
            transition.tapeDirection = 'LLS';
            break;

          case 'C1B':
            transition.to = 4;
            transition.headReplace = 'C1B';
            transition.tapeDirection = 'RSS';
            break;
          case 'C0B':
            transition.to = 4;
            transition.headReplace = 'C0B';
            transition.tapeDirection = 'RSS';
            break;

          case 'CBB':
            transition.to = 5;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRS';
            break;
          case '1BB':
            transition.to = 5;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'SSS';
            break;
          case '0BB':
            transition.to = 5;
            transition.headReplace = '0BB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 4:
        switch (transition.head) {
          case '11B':
            transition.to = 1;
            transition.headReplace = '111';
            transition.tapeDirection = 'SSR';
            break;
          case '01B':
            transition.to = 1;
            transition.headReplace = '010';
            transition.tapeDirection = 'SSR';
            break;
          case '10B':
            transition.to = 1;
            transition.headReplace = '100';
            transition.tapeDirection = 'SSR';
            break;
          case '00B':
            transition.to = 1;
            transition.headReplace = '001';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case '11B':
            transition.to = 5;
            transition.headReplace = '111';
            transition.tapeDirection = 'SSS';
            break;
          case '01B':
            transition.to = 5;
            transition.headReplace = '010';
            transition.tapeDirection = 'SSS';
            break;
          case '10B':
            transition.to = 5;
            transition.headReplace = '100';
            transition.tapeDirection = 'SSS';
            break;
          case '00B':
            transition.to = 5;
            transition.headReplace = '001';
            transition.tapeDirection = 'SSS';
            break;
          default:
            break;
        }
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
