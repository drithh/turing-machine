import { Symbol, Direction, Transition, TwoInput } from '../type';
import { OneTape } from './tape';

export class DivisionSingleTrack {
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
    return DivisionSingleTrack.totalTape;
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
          case '0':
            transition.to = 1;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 1;
            transition.headReplace = 'C';
            transition.tapeDirection = 'S';
            break;

          case 'B':
            transition.to = 19;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;

          case '1':
            transition.to = 21;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 21;
            transition.headReplace = 'C';
            transition.tapeDirection = 'S';
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
          case '0':
            transition.to = 3;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 4;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
      case 10:
        break;
      case 11:
        break;
      case 12:
        break;
      case 13:
        break;
      case 14:
        break;
      case 15:
        break;
      case 16:
        break;
      case 17:
        break;
      case 18:
        break;
      case 19:
        break;
      case 20:
        break;
      case 21:
        break;
      case 22:
        break;
      case 23:
        break;
      case 24:
        break;
      case 25:
        break;
      case 26:
        break;
      case 27:
        break;
      case 28:
        break;
      case 29:
        break;
      case 30:
        break;
      case 31:
        break;
      case 32:
        break;
      case 33:
        break;
      case 34:
        break;
      case 35:
        break;
      case 36:
        break;
      case 37:
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
