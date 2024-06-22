import { Transition } from '../type';
import { Strategy } from './strategy';

export class MultiplicationSingleTrack implements Strategy {
  public totalTape: number = 1;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '0':
            transition.to = 1;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 16;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 16;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;

          case '1':
            transition.to = 17;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '0':
            transition.to = 1;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 2;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case 'E':
            transition.to = 2;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;

          case '1':
            transition.to = 3;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;

          case '0':
            transition.to = 4;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;

          case 'B':
            transition.to = 15;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 3:
        switch (transition.head) {
          case '1':
            transition.to = 3;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 5;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 4:
        switch (transition.head) {
          case '0':
            transition.to = 4;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 6;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
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
            transition.to = 7;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 6:
        switch (transition.head) {
          case '1':
            transition.to = 6;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;

          case 'B':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 7:
        switch (transition.head) {
          case '0':
            transition.to = 7;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 9;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 8:
        switch (transition.head) {
          case '1':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 10;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 9:
        switch (transition.head) {
          case '1':
            transition.to = 11;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;

          case 'E':
            transition.to = 12;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 10:
        switch (transition.head) {
          case '0':
            transition.to = 11;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;

          case 'E':
            transition.to = 13;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 11:
        switch (transition.head) {
          case 'C':
            transition.to = 2;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;

          case '0':
            transition.to = 11;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 11;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'E':
            transition.to = 11;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 12:
        switch (transition.head) {
          case 'E':
            transition.to = 12;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 14;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 13:
        switch (transition.head) {
          case 'E':
            transition.to = 13;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 14;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 14:
        switch (transition.head) {
          case 'B':
            transition.to = 0;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;

          case '0':
            transition.to = 14;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 15:
        switch (transition.head) {
          case '0':
            transition.to = 15;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 15;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 15;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;

          case 'B':
            transition.to = 16;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      // final
      case 16:
        switch (transition.head) {
          case '0':
            transition.to = 16;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 16;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 16;
            transition.headReplace = 'B';
            transition.tapeDirection = 'S';
            break;
          default:
            break;
        }
        break;
      case 17:
        switch (transition.head) {
          case '1':
            transition.to = 17;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 18;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 18:
        switch (transition.head) {
          case 'E':
            transition.to = 18;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;

          case '1':
            transition.to = 20;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;

          case '0':
            transition.to = 19;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;

          case 'B':
            transition.to = 15;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 19:
        switch (transition.head) {
          case '0':
            transition.to = 19;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 21;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 20:
        switch (transition.head) {
          case '1':
            transition.to = 20;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;

          case 'C':
            transition.to = 22;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 21:
        switch (transition.head) {
          case '0':
            transition.to = 21;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;

          case 'B':
            transition.to = 23;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 22:
        switch (transition.head) {
          case '1':
            transition.to = 22;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;

          case 'B':
            transition.to = 24;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 23:
        switch (transition.head) {
          case '0':
            transition.to = 23;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 25;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 24:
        switch (transition.head) {
          case '1':
            transition.to = 24;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 26;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 25:
        switch (transition.head) {
          case '0':
            transition.to = 27;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;

          case 'E':
            transition.to = 28;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 26:
        switch (transition.head) {
          case '1':
            transition.to = 27;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;

          case 'E':
            transition.to = 29;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 27:
        switch (transition.head) {
          case 'C':
            transition.to = 18;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;

          case '0':
            transition.to = 27;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 27;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'E':
            transition.to = 27;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 28:
        switch (transition.head) {
          case 'E':
            transition.to = 28;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 30;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 29:
        switch (transition.head) {
          case 'E':
            transition.to = 29;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;

          case 'C':
            transition.to = 30;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 30:
        switch (transition.head) {
          case 'B':
            transition.to = 0;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;

          case '1':
            transition.to = 30;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
