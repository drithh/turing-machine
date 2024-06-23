import { Transition } from '../../src/components/type';
import { Strategy } from '../../src/components/turing-machine/strategy';

export class MultiplicationMultiTape implements Strategy {
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
            transition.headReplace = '111';
            transition.tapeDirection = 'SLR';
            break;
          case '00B':
            transition.to = 1;
            transition.headReplace = '001';
            transition.tapeDirection = 'SLR';
            break;

          case '01B':
            transition.to = 1;
            transition.headReplace = '010';
            transition.tapeDirection = 'SLR';
            break;
          case '10B':
            transition.to = 1;
            transition.headReplace = '100';
            transition.tapeDirection = 'SLR';
            break;

          case '1BB':
            transition.to = 2;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RRS';
            break;
          case '0BB':
            transition.to = 2;
            transition.headReplace = '0BB';
            transition.tapeDirection = 'RRS';
            break;

          case 'B1B':
            transition.to = 3;
            transition.headReplace = 'B1B';
            transition.tapeDirection = 'SSS';
            break;
          case 'B0B':
            transition.to = 3;
            transition.headReplace = 'B0B';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 2:
        switch (transition.head) {
          case '11B':
            transition.to = 2;
            transition.headReplace = '111';
            transition.tapeDirection = 'SRR';
            break;
          case '00B':
            transition.to = 2;
            transition.headReplace = '001';
            transition.tapeDirection = 'SRR';
            break;

          case '01B':
            transition.to = 2;
            transition.headReplace = '010';
            transition.tapeDirection = 'SRR';
            break;
          case '10B':
            transition.to = 2;
            transition.headReplace = '100';
            transition.tapeDirection = 'SRR';
            break;

          case '1BB':
            transition.to = 1;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RLS';
            break;
          case '0BB':
            transition.to = 1;
            transition.headReplace = '0BB';
            transition.tapeDirection = 'RLS';
            break;

          case 'B1B':
            transition.to = 3;
            transition.headReplace = 'B1B';
            transition.tapeDirection = 'SSS';
            break;
          case 'B0B':
            transition.to = 3;
            transition.headReplace = 'B0B';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 3:
        break;
    }

    return transition.to === -1 ? undefined : transition;
  };
}
