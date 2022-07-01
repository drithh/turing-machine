import { Symbol, Direction, Transition, TwoInput } from '../type';
import { OneTape } from './tape';

export class AdditionSingleTrack {
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
    return AdditionSingleTrack.totalTape;
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
      head: this.tapes.read(),
      headReplace: '',
      tapeDirection: '',
    };


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
            transition.to = 8;
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
          case '0':
            transition.to = 4;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 4;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 8;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 6;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 6;
            transition.headReplace = '1';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case '1':
            transition.to = 5;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 5;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 7;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '0':
            transition.to = 7;
            transition.headReplace = '0';
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
          case '0':
            transition.to = 6;
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
      case 7:
        switch (transition.head) {
          case 'E':
            transition.to = 7;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 7;
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
      case 8:
        switch (transition.head) {
          case 'E':
            transition.to = 8;
            transition.headReplace = 'B';
            transition.tapeDirection = 'L';
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
