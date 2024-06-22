import { Transition } from '../type';
import { Strategy } from './strategy';

export class SubtractionSingleTrack implements Strategy {
  public totalTape: number = 1;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '1':
            transition.to = 0;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case '0':
            transition.to = 0;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 0;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 0;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 1;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '0':
            transition.to = 2;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 10;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 3;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case '0':
            transition.to = 2;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 4;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 3:
        switch (transition.head) {
          case '1':
            transition.to = 3;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 5;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 4:
        switch (transition.head) {
          case '1':
            transition.to = 4;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 4;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 6;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '0':
            transition.to = 6;
            transition.headReplace = '0';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case '0':
            transition.to = 5;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 5;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 9;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 7;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 7;
            transition.headReplace = '1';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 6:
        switch (transition.head) {
          case 'E':
            transition.to = 6;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 6;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case '0':
            transition.to = 0;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 0;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 7:
        switch (transition.head) {
          case 'E':
            transition.to = 7;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '0':
            transition.to = 7;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 0;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 0;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 8:
        switch (transition.head) {
          case '0':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 10;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 9:
        switch (transition.head) {
          case '1':
            transition.to = 9;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 10;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 10:
        switch (transition.head) {
          case 'E':
            transition.to = 10;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
          default:
            break;
        }
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
