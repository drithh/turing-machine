import { Symbol, Direction, Transition, TwoInput } from '../type';
import { OneTape } from './tape';

export class DivisionSingleTrack {
  public setup(inputSymbols: TwoInput) {
    this.inputSymbols = resolveInput(inputSymbols);
    this.tapes = new OneTape(resolveInput(inputSymbols));
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
      console.log(transition);
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

          case 'B':
            transition.to = 24;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 24;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 26;
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
        switch (transition.head) {
          case '0':
            transition.to = 3;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 3;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
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
          case '1':
            transition.to = 4;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 4;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 6;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case '0':
            transition.to = 10;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case 'E':
            transition.to = 5;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 7;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 6:
        switch (transition.head) {
          case '1':
            transition.to = 11;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case 'E':
            transition.to = 6;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 8;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 7:
        switch (transition.head) {
          case 'E':
            transition.to = 7;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 7;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 7;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 9;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 8:
        switch (transition.head) {
          case 'E':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 8;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case '0':
            transition.to = 8;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 8;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 9;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }

        break;
      case 9:
        switch (transition.head) {
          case '0':
            transition.to = 9;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 9;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 9;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 0;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 10:
        switch (transition.head) {
          case '0':
            transition.to = 12;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 7;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
        }
        break;
      case 11:
        switch (transition.head) {
          case '1':
            transition.to = 13;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 8;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }

        break;
      case 12:
        switch (transition.head) {
          case '0':
            transition.to = 12;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 14;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 13:
        switch (transition.head) {
          case '1':
            transition.to = 13;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 15;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 14:
        switch (transition.head) {
          case '0':
            transition.to = 16;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 9;
            transition.headReplace = 'B';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 15:
        switch (transition.head) {
          case '0':
            transition.to = 17;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 9;
            transition.headReplace = 'B';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 16:
        switch (transition.head) {
          case '0':
            transition.to = 16;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 18;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 17:
        switch (transition.head) {
          case '0':
            transition.to = 17;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 19;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 18:
        switch (transition.head) {
          case '0':
            transition.to = 20;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 23;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 19:
        switch (transition.head) {
          case '0':
            transition.to = 21;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 22;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 20:
        switch (transition.head) {
          case '0':
            transition.to = 20;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 3;
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
          case 'C':
            transition.to = 4;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 22:
        switch (transition.head) {
          case '0':
            transition.to = 22;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 22;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 22;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 49;
            transition.headReplace = '0';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 23:
        switch (transition.head) {
          case '0':
            transition.to = 23;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 23;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 23;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 49;
            transition.headReplace = '1';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 24:
        switch (transition.head) {
          case '0':
            transition.to = 25;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 25;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 25;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 25:
        switch (transition.head) {
          case '0':
            transition.to = 25;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 25;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 25;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 49;
            transition.headReplace = 'B';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 26:
        switch (transition.head) {
          case '1':
            transition.to = 26;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 27;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 27:
        switch (transition.head) {
          case '0':
            transition.to = 28;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 29;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 28:
        switch (transition.head) {
          case '0':
            transition.to = 28;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 28;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
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
          case '1':
            transition.to = 29;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 29;
            transition.headReplace = 'E';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 31;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 30:
        switch (transition.head) {
          case 'E':
            transition.to = 30;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 32;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case '0':
            transition.to = 35;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 31:
        switch (transition.head) {
          case 'E':
            transition.to = 31;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 33;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 36;
            transition.headReplace = 'E';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 32:
        switch (transition.head) {
          case 'E':
            transition.to = 32;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 32;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case '0':
            transition.to = 32;
            transition.headReplace = '0';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 32;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 34;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 33:
        switch (transition.head) {
          case 'E':
            transition.to = 33;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 33;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
          case '1':
            transition.to = 33;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'B':
            transition.to = 34;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 34:
        switch (transition.head) {
          case '0':
            transition.to = 34;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case '1':
            transition.to = 34;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 34;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 0;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 35:
        switch (transition.head) {
          case '0':
            transition.to = 37;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 32;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 36:
        switch (transition.head) {
          case '1':
            transition.to = 38;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 33;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 37:
        switch (transition.head) {
          case '0':
            transition.to = 37;
            transition.headReplace = '0';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 39;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 38:
        switch (transition.head) {
          case '1':
            transition.to = 38;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'C':
            transition.to = 40;
            transition.headReplace = 'C';
            transition.tapeDirection = 'L';
            break;
        }
        break;
      case 39:
        switch (transition.head) {
          case '1':
            transition.to = 41;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 34;
            transition.headReplace = 'B';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 40:
        switch (transition.head) {
          case '1':
            transition.to = 42;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 34;
            transition.headReplace = 'B';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 41:
        switch (transition.head) {
          case '1':
            transition.to = 41;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 43;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 42:
        switch (transition.head) {
          case '1':
            transition.to = 42;
            transition.headReplace = '1';
            transition.tapeDirection = 'L';
            break;
          case 'B':
            transition.to = 44;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 43:
        switch (transition.head) {
          case '1':
            transition.to = 45;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 47;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 44:
        switch (transition.head) {
          case '1':
            transition.to = 46;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 48;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 45:
        switch (transition.head) {
          case '1':
            transition.to = 45;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 28;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 46:
        switch (transition.head) {
          case '1':
            transition.to = 46;
            transition.headReplace = '1';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 29;
            transition.headReplace = 'C';
            transition.tapeDirection = 'R';
            break;
        }
        break;
      case 47:
        switch (transition.head) {
          case '1':
            transition.to = 47;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '0':
            transition.to = 47;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 47;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 49;
            transition.headReplace = '0';
            transition.tapeDirection = 'S';
            break;
        }
        break;
      case 48:
        switch (transition.head) {
          case '1':
            transition.to = 48;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case '0':
            transition.to = 48;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'E':
            transition.to = 48;
            transition.headReplace = 'B';
            transition.tapeDirection = 'R';
            break;
          case 'C':
            transition.to = 49;
            transition.headReplace = '1';
            transition.tapeDirection = 'S';
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
  inputstring.push('C');
  return inputstring as Symbol[];
};
