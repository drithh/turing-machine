import { TwoInput, Symbol, Direction, Transition } from '../type';
import { ThreeTape } from './tape';

export class MultiplicationMultiTape {
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
    return [this.tapes.all().tape1, this.tapes.all().tape2];
  }

  public getTransitions() {
    return this.transitions;
  }

  public getTotalTape() {
    return MultiplicationMultiTape.totalTape;
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
