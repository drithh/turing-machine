import { TwoInput, Symbol, Direction, Transition } from '../type';
import { ThreeTape } from './tape';

export class PowerMultiTape {
  public setup(inputSymbols: TwoInput) {
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
    return [
      this.tapes.all().tape1,
      this.tapes.all().tape2,
      this.tapes.all().tape3,
    ];
  }

  public getTransitions() {
    return this.transitions;
  }

  public getTotalTape() {
    return PowerMultiTape.totalTape;
  }

  public getInputSymbols() {
    return this.inputSymbols;
  }

  public getLastHead() {
    const directions = this.transitions.map((e) => {
      return [e?.tapeDirection[0], e?.tapeDirection[1], e?.tapeDirection[2]];
    });
    let first = 0;
    let second = 0;
    let third = 0;
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
      if (e[2] === 'L') {
        third--;
      }
      if (e[2] === 'R') {
        third++;
      }
    });
    return [first, second, third];
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
        }
        break;
    }

    return transition.to === -1 ? false : transition;
  };
}

const resolveInput = (input: TwoInput): Symbol[] => {
  let inputstring = new Array<string>();
  for (let i = 0; i < Math.abs(input.input1); i++) {
    inputstring.push(input.input1 > 0 ? '1' : '0');
  }
  inputstring.push('C');
  for (let i = 0; i < Math.abs(input.input2); i++) {
    inputstring.push(input.input2 > 0 ? '1' : '0');
  }
  return inputstring as Symbol[];
};
