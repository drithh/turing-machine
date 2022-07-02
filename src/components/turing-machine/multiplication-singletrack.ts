import { Symbol, Direction, Transition, TwoInput } from '../type';
import { OneTape } from './tape';

export class MultiplicationSingleTrack {
  public setup(inputSymbols: TwoInput) {
    this.inputSymbols = resolveInput(inputSymbols);
    this.tapes = new OneTape(this.inputSymbols);
  }
  private inputSymbols: Symbol[] = [];
  static totalTape = 1;
  private tapes: OneTape = new OneTape([]);

  private transitions = new Array<Transition>();
  private lastTransition: Transition;

  public async run() {
    do {
      const transition = this.getNextTransition(
        this.lastTransition ? this.lastTransition.to : 0
      );
      if (transition !== false) {
        this.tapes.write(transition.headReplace as Symbol);
        this.tapes.moveHead(transition.tapeDirection as Direction);

        this.transitions.push(transition);
        this.lastTransition = transition;
      } else {
        this.lastTransition = undefined;
      }
    } while (this.lastTransition !== undefined);
  }

  public getResult() {
    return [this.tapes.all()];
  }

  public getTransitions() {
    return this.transitions;
  }

  public getTotalTape() {
    return MultiplicationSingleTrack.totalTape;
  }

  public getInputSymbols() {
    return this.inputSymbols;
  }

  public getLastHead() {
    const directions = this.transitions.map((e) => {
      return [e?.tapeDirection[0], e?.tapeDirection[1]];
    });
    let first = 0;
    directions.forEach((e) => {
      if (e[0] === 'L') {
        first--;
      } else if (e[0] === 'R') {
        first++;
      }
    });
    return [first];
  }

  private getNextTransition = (currentHead: number) => {
    let transition: Transition = {
      from: currentHead,
      to: -1,
      head: this.tapes.read(),
      headReplace: '',
      tapeDirection: '',
    };

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
          case '00':
            transition.to = 1;
            transition.headReplace = '0B';
            transition.tapeDirection = 'RL';
            break;
          case '11':
            transition.to = 1;
            transition.headReplace = '1B';
            transition.tapeDirection = 'RL';
            break;
          case '0B':
            transition.to = 1;
            transition.headReplace = '01';
            transition.tapeDirection = 'RR';
            break;
          case '1B':
            transition.to = 1;
            transition.headReplace = '10';
            transition.tapeDirection = 'RR';
            break;
          case '01':
            transition.to = 1;
            transition.headReplace = '01';
            transition.tapeDirection = 'SR';
            break;
          case '10':
            transition.to = 1;
            transition.headReplace = '10';
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
  inputstring.push('C');
  return inputstring as Symbol[];
};
