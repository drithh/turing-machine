import { Transition } from '../../src/components/type';
import { Strategy } from '../../src/components/turing-machine/strategy';

export class FactorialMultiTrack implements Strategy {
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
            transition.tapeDirection = 'RRR';
            break;
          case 'BBB':
            transition.to = 18;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '1BB':
            transition.to = 1;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RRR';
            break;
          case 'BBB':
            transition.to = 2;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case '1BB':
            transition.to = 3;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;
      case 3:
        switch (transition.head) {
          case '1BB':
            transition.to = 3;
            transition.headReplace = '111';
            transition.tapeDirection = 'LLL';
            break;
          case 'BBB':
            transition.to = 4;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;
      case 4:
        switch (transition.head) {
          case '1X1':
            transition.to = 4;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'RRR';
            break;
          case '111':
            transition.to = 5;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'RRR';
            break;
          case '1B1':
            transition.to = 18;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      // cekcekckeckekc
      // cekcekckeckekc
      // cekcekckeckekc
      // cekcekckeckekc
      case 5:
        switch (transition.head) {
          case '111':
            transition.to = 5;
            transition.headReplace = '111';
            transition.tapeDirection = 'RRR';
            break;
          case '1B1':
            transition.to = 5;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'RRR';
            break;
          case 'ZB1':
            transition.to = 5;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'RRR';
            break;
          case 'Z11':
            transition.to = 5;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'RRR';
            break;
          case 'ZX1':
            transition.to = 5;
            transition.headReplace = 'ZX1';
            transition.tapeDirection = 'RRR';
            break;
          case 'B11':
            transition.to = 5;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'RRR';
            break;
          case 'BX1':
            transition.to = 5;
            transition.headReplace = 'BX1';
            transition.tapeDirection = 'RRR';
            break;

          case 'BBB':
            transition.to = 6;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'LLL';
            break;
          case 'BB1':
            transition.to = 6;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 6:
        switch (transition.head) {
          case '1B1':
            transition.to = 7;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'LLL';
            break;

          case 'ZB1':
            transition.to = 7;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;
          case 'Z11':
            transition.to = 7;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'LLL';
            break;
          case 'B11':
            transition.to = 7;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'LLL';
            break;

          case 'BB1':
            transition.to = 7;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;
      case 7:
        switch (transition.head) {
          case '1B1':
            transition.to = 7;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'LLL';
            break;

          case '111':
            transition.to = 8;
            transition.headReplace = '111';
            transition.tapeDirection = 'LLL';
            break;
          case 'Z11':
            transition.to = 8;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'LLL';
            break;
          case 'B11':
            transition.to = 8;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'LLL';
            break;

          case '1X1':
            transition.to = 13;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'RRR';
            break;
          case 'BX1':
            transition.to = 13;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'SSS';
            break;

          case 'BBB':
            transition.to = 18;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;

      case 8:
        switch (transition.head) {
          case '111':
            transition.to = 8;
            transition.headReplace = '111';
            transition.tapeDirection = 'LLL';
            break;
          case '1X1':
            transition.to = 8;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'LLL';
            break;
          case 'BB1':
            transition.to = 8;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'LLL';
            break;
          case '1B1':
            transition.to = 8;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'LLL';
            break;
          case 'ZB1':
            transition.to = 8;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;
          case 'Z11':
            transition.to = 8;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'LLL';
            break;
          case 'B11':
            transition.to = 8;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'LLL';
            break;
          case 'ZX1':
            transition.to = 8;
            transition.headReplace = 'ZX1';
            transition.tapeDirection = 'LLL';
            break;
          case 'BX1':
            transition.to = 8;
            transition.headReplace = 'BX1';
            transition.tapeDirection = 'LLL';
            break;

          case 'BBB':
            transition.to = 9;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRR';
            break;
          case 'YX1':
            transition.to = 9;
            transition.headReplace = 'YX1';
            transition.tapeDirection = 'RRR';
            break;
          case 'Y11':
            transition.to = 9;
            transition.headReplace = 'Y11';
            transition.tapeDirection = 'RRR';
            break;
          case 'YB1':
            transition.to = 9;
            transition.headReplace = 'YB1';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;

      case 9:
        switch (transition.head) {
          case 'BB1':
            transition.to = 11;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'LLL';
            break;
          case 'ZB1':
            transition.to = 11;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;
          case 'Z11':
            transition.to = 11;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'LLL';
            break;
          case 'ZX1':
            transition.to = 11;
            transition.headReplace = 'ZX1';
            transition.tapeDirection = 'LLL';
            break;

          case '1X1':
            transition.to = 10;
            transition.headReplace = 'YX1';
            transition.tapeDirection = 'RRR';
            break;
          case '111':
            transition.to = 10;
            transition.headReplace = 'Y11';
            transition.tapeDirection = 'RRR';
            break;
          case '1B1':
            transition.to = 10;
            transition.headReplace = 'YB1';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;

      case 10:
        switch (transition.head) {
          case '111':
            transition.to = 10;
            transition.headReplace = '111';
            transition.tapeDirection = 'RRR';
            break;
          case '1X1':
            transition.to = 10;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'RRR';
            break;
          case 'BB1':
            transition.to = 10;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'RRR';
            break;
          case '1B1':
            transition.to = 10;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'RRR';
            break;
          case 'ZB1':
            transition.to = 10;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'RRR';
            break;
          case 'Z11':
            transition.to = 10;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'RRR';
            break;
          case 'B11':
            transition.to = 10;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'RRR';
            break;
          case 'ZX1':
            transition.to = 10;
            transition.headReplace = 'ZX1';
            transition.tapeDirection = 'RRR';
            break;
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08
          case 'BX1':
            transition.to = 10;
            transition.headReplace = 'BX1';
            transition.tapeDirection = 'RRR';
            break;
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08
          // NEWWW 20:08

          case 'BBB':
            transition.to = 8;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;

      case 11:
        switch (transition.head) {
          case 'YB1':
            transition.to = 11;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'LLL';
            break;
          case 'Y11':
            transition.to = 11;
            transition.headReplace = '111';
            transition.tapeDirection = 'LLL';
            break;
          case 'YX1':
            transition.to = 11;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'LLL';
            break;

          case 'BBB':
            transition.to = 12;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;

      case 12:
        switch (transition.head) {
          case '1X1':
            transition.to = 12;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'RRR';
            break;
          case 'ZX1':
            transition.to = 12;
            transition.headReplace = 'ZX1';
            transition.tapeDirection = 'RRR';
            break;
          case 'BX1':
            transition.to = 12;
            transition.headReplace = 'BX1';
            transition.tapeDirection = 'RRR';
            break;

          case '111':
            transition.to = 5;
            transition.headReplace = '1X1';
            transition.tapeDirection = 'RRR';
            break;
          case 'Z11':
            transition.to = 5;
            transition.headReplace = 'ZX1';
            transition.tapeDirection = 'RRR';
            break;
          case 'B11':
            transition.to = 5;
            transition.headReplace = 'BX1';
            transition.tapeDirection = 'RRR';
            break;
          case 'BB1':
            transition.to = 5;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'SSS';
            break;
          // THIS
          // THIS
          // THIS
          // THIS
          // THIS
          // case '1B1':
          //   transition.to = XXX(18);
          //   transition.headReplace = '1B1';
          //   transition.tapeDirection = 'SSS';
          //   break;
        }
        break;

      case 13:
        switch (transition.head) {
          case '1B1':
            transition.to = 14;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;

          case 'BB1':
            transition.to = 15;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;

      case 14:
        switch (transition.head) {
          case '1B1':
            transition.to = 15;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;

      case 15:
        switch (transition.head) {
          case '1X1':
            transition.to = 15;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'LLL';
            break;
          case 'BX1':
            transition.to = 15;
            transition.headReplace = 'BB1';
            transition.tapeDirection = 'LLL';
            break;
          case 'ZX1':
            transition.to = 15;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;

          case 'BBB':
            transition.to = 16;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;

      case 16:
        switch (transition.head) {
          case '1B1':
            transition.to = 16;
            transition.headReplace = '111';
            transition.tapeDirection = 'RRR';
            break;
          case 'ZB1':
            transition.to = 16;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'RRR';
            break;
          case 'BB1':
            transition.to = 16;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'RRR';
            break;

          case 'BBB':
            transition.to = 17;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'LLL';
            break;
        }
        break;

      case 17:
        switch (transition.head) {
          case 'ZB1':
            transition.to = 17;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;
          case 'Z11':
            transition.to = 17;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'LLL';
            break;
          case 'B11':
            transition.to = 17;
            transition.headReplace = 'B11';
            transition.tapeDirection = 'LLL';
            break;

          case '1B1':
            transition.to = 7;
            transition.headReplace = 'ZB1';
            transition.tapeDirection = 'LLL';
            break;
          case '111':
            transition.to = 7;
            transition.headReplace = 'Z11';
            transition.tapeDirection = 'LLL';
            break;
          //NEWNENWNEWNENW
          //NEWNENWNEWNENW
          //NEWNENWNEWNENW
          case 'BBB':
            transition.to = 7;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;

      case 18:
        switch (transition.head) {
          // case '1B1':
          //   transition.to = 18;
          //   transition.headReplace = '1B1';
          //   transition.tapeDirection = 'RRR';
          //   break;
          case 'ZB1':
            transition.to = 18;
            transition.headReplace = '1B1';
            transition.tapeDirection = 'RRR';
            break;
          case 'Y11':
            transition.to = 18;
            // transition.headReplace = '111';
            transition.headReplace = '1B1';
            transition.tapeDirection = 'RRR';
            break;

          case 'Z11':
            transition.to = 18;
            // transition.headReplace = '111';
            transition.headReplace = '1B1';
            transition.tapeDirection = 'RRR';
            break;
          default:
            break;
        }
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
