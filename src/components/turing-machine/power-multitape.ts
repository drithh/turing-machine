import { Transition } from '../type';
import { Strategy } from './strategy';

export class PowerMultiTape implements Strategy {
  public totalTape: number = 3;
  public getNextTransition = (
    transition: Transition
  ): Transition | undefined => {
    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '1BB':
            transition.to = 0;
            transition.headReplace = '1EE';
            transition.tapeDirection = 'SRS';
            break;
          case '1BE':
            transition.to = 0;
            transition.headReplace = '11E';
            transition.tapeDirection = 'RLS';
            break;
          case '1EE':
            transition.to = 0;
            transition.headReplace = '1EE';
            transition.tapeDirection = 'RSS';
            break;

          case 'CEE':
            transition.to = 1;
            transition.headReplace = 'CEE';
            transition.tapeDirection = 'RSS';
            break;

          case 'CBB':
            transition.to = 5;
            transition.headReplace = 'CB1';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 1:
        switch (transition.head) {
          case '1EE':
            transition.to = 2;
            transition.headReplace = 'EEE';
            transition.tapeDirection = 'LSS';
            break;

          case 'BEE':
            transition.to = 5;
            transition.headReplace = 'BE1';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case 'EEE':
            transition.to = 2;
            transition.headReplace = 'EEE';
            transition.tapeDirection = 'LSS';
            break;
          case 'CEE':
            transition.to = 2;
            transition.headReplace = 'CEE';
            transition.tapeDirection = 'LSS';
            break;
          case '1EE':
            transition.to = 2;
            transition.headReplace = '1EE';
            transition.tapeDirection = 'LSS';
            break;

          case 'BEE':
            transition.to = 3;
            transition.headReplace = 'BEE';
            transition.tapeDirection = 'RRR';
            break;
        }
        break;
      case 3:
        switch (transition.head) {
          case '11B':
            transition.to = 3;
            transition.headReplace = '111';
            transition.tapeDirection = 'SRR';
            break;
          case '111':
            transition.to = 3;
            transition.headReplace = '111';
            transition.tapeDirection = 'SRR';
            break;
          case '1B1':
            transition.to = 3;
            transition.headReplace = '111';
            transition.tapeDirection = 'SRR';
            break;

          case '1BB':
            transition.to = 4;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RLS';
            break;
          case 'C1B':
            transition.to = 4;
            transition.headReplace = 'C1B';
            transition.tapeDirection = 'SLS';
            break;
          case 'CBB':
            transition.to = 4;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SLS';
            break;
        }
        break;
      case 4:
        switch (transition.head) {
          case '1EE':
            transition.to = 2;
            transition.headReplace = 'EEE';
            transition.tapeDirection = 'LSS';
            break;

          case '1EB':
            transition.to = 3;
            transition.headReplace = '1EB';
            transition.tapeDirection = 'RRS';
            break;

          case '11B':
            transition.to = 4;
            transition.headReplace = '111';
            transition.tapeDirection = 'SLR';
            break;
          case 'C1B':
            transition.to = 4;
            transition.headReplace = 'C1B';
            transition.tapeDirection = 'SLS';
            break;
          case 'CEB':
            transition.to = 4;
            transition.headReplace = 'CEB';
            transition.tapeDirection = 'SSL';
            break;
          case 'CE1':
            transition.to = 4;
            transition.headReplace = 'CE1';
            transition.tapeDirection = 'SSL';
            break;
          case 'CEE':
            transition.to = 4;
            transition.headReplace = 'CEE';
            transition.tapeDirection = 'RSS';
            break;
          case 'EEE':
            transition.to = 4;
            transition.headReplace = 'EEE';
            transition.tapeDirection = 'RSS';
            break;

          case 'BEE':
            transition.to = 5;
            transition.headReplace = 'BEE';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case 'EEE':
            transition.to = 5;
            // transition.headReplace = '111'; -> ORIGINAL -> KALO PAKE INI KELEBIHAN 1 satu kali
            transition.headReplace = '11B';
            transition.tapeDirection = 'LSS';
            break;
          case 'E11':
            transition.to = 5;
            transition.headReplace = '111';
            transition.tapeDirection = 'LSS';
            break;
          case '1B1':
            transition.to = 5;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'SSS';
            break;
          case 'BB1':
            transition.to = 5;
            transition.headReplace = 'BB1';
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
