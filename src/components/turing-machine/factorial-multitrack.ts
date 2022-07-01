import { Symbol, Direction, Transition } from '../type';
import { ThreeTape } from './tape';

export class FactorialMultiTrack {
  public setup(inputSymbols: number) {
    this.inputSymbols = resolveInput(inputSymbols);
    this.tapes = new ThreeTape(this.inputSymbols);
  }
  private inputSymbols: Symbol[] = [];
  static totalTape = 3;
  private tapes: ThreeTape = new ThreeTape([]);

  private transitions = new Array<Transition>();
  private lastTransition: Transition;

  public async run() {
    do {
      const transition = this.getNextTransition(
        this.lastTransition ? this.lastTransition.to : 0
      );
      if (transition !== false) {
        this.tapes.write([...transition.headReplace] as Symbol[]);
        this.tapes.moveHead([...transition.tapeDirection] as Direction[]);

        this.transitions.push(transition);
        this.lastTransition = transition;
      } else {
        this.lastTransition = undefined;
      }
    } while (this.lastTransition !== undefined);
  }

  public getResult() {
    return [this.tapes.all().tape1, this.tapes.all().tape2,, this.tapes.all().tape3];
  }

  public getTransitions() {
    return this.transitions;
  }

  public getTotalTape() {
    return FactorialMultiTrack.totalTape;
  }

  public getInputSymbols() {
    return this.inputSymbols;
  }

  public getLastHead() {
    const directions = this.transitions.map((e) => {
      return [e?.tapeDirection[0], e?.tapeDirection[1]];
    });
    let first = 0;
    let second = 0;
    directions.forEach((e) => {
      if (e[0] === 'L') {
        first--;
      } else if (e[0] === 'R') {
        first++;
      }
      if (e[1] === 'L') {
        second--;
      } else if (e[1] === 'R') {
        second++;
      }
    });
    return [first, second];
  }

  private getNextTransition = (currentHead: number) => {
    let transition: Transition = {
      from: currentHead,
      to: -1,
      head: this.tapes.read().join(''),
      headReplace: '',
      tapeDirection: '',
    };

    switch (transition.from) {
      case 0:
        switch (transition.head) {
          case '1BB':
            transition.to = 1;
            transition.headReplace = '1BB';
            transition.tapeDirection = 'RRR';
            break;
          case 'BBB':
            transition.to = 21;
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
                transition.to = 21;
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
                transition.to = 21;
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
              case '1B1':
                transition.to = 18;
                transition.headReplace = '1B1';
                transition.tapeDirection = 'SSS';
                break;
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
            }
          break;
          
          case 21:
            switch (transition.head) {
              // case '1B1':
              //   transition.to = 21;
              //   transition.headReplace = '1B1';
              //   transition.tapeDirection = 'RRR';
              //   break;
              case 'ZB1':
                transition.to = 21;
                transition.headReplace = '1B1';
                transition.tapeDirection = 'RRR';
                break;
              case 'Y11':
                transition.to = 21;
                transition.headReplace = '111';
                transition.tapeDirection = 'RRR';
                break;

              case 'Z11':
                transition.to = 21;
                // transition.headReplace = '1B1';
                transition.headReplace = '111';
                transition.tapeDirection = 'RRR';
                break;
                default:
                  break;
            }
          break;
    }

    return transition.to === -1 ? false : transition;
  };
}

const resolveInput = (input: number): Symbol[] => {
  let inputstring = new Array<string>();
  for (let i = 0; i < Math.abs(input); i++) {
    inputstring.push(input > 0 ? '1' : '0');
  }
  return inputstring as Symbol[];
};
