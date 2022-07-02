import { Symbol, Direction, Transition, Temperature } from '../type';
import { ThreeTape } from './tape';

export class TemperatureConversionMultiTape {
  public setup(inputSymbols: Temperature) {
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
    return TemperatureConversionMultiTape.totalTape;
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
          case 'IBB':
            transition.to = 0;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'OBB':
            transition.to = 0;
            transition.headReplace = 'OBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'PBB':
            transition.to = 0;
            transition.headReplace = 'PBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'TBB':
            transition.to = 0;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'YBB':
            transition.to = 0;
            transition.headReplace = 'YBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'UBB':
            transition.to = 0;
            transition.headReplace = 'UBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'CBB':
            transition.to = 1;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'FBB':
            transition.to = 31;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'KBB':
            transition.to = 63;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
        }
        break;
      case 1:
        switch (transition.head) {
          case 'FBB':
            transition.to = 2;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'KBB':
            transition.to = 21;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'LSS';
        }
        break;
      case 2:
        switch (transition.head) {
          case 'CBB':
            transition.to = 3;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      // Celcius To Fahrenheit
      case 3:
        [transition.to, transition.headReplace, transition.tapeDirection] =
          goLeftFill(transition.head, 3);
        if (transition.to === 0) {
          [transition.to, transition.headReplace, transition.tapeDirection] = [
            4,
            'BBB',
            'RSS',
          ];
        }
        break;
      case 4:
        switch (transition.head) {
          case 'PBB':
            transition.to = 5;
            transition.headReplace = 'PPB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 5;
            transition.headReplace = 'UUB';
            transition.tapeDirection = 'SRS';
            break;
          case 'TBB':
            transition.to = 7;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'CBB':
            transition.to = 7;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 7;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'OBB':
            transition.to = 7;
            transition.headReplace = 'OBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'IBB':
            transition.to = 7;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'YBB':
            transition.to = 7;
            transition.headReplace = 'YBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 5:
        switch (transition.head) {
          case 'PBB':
            transition.to = 6;
            transition.headReplace = 'PYB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 6;
            transition.headReplace = 'UOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 6:
        switch (transition.head) {
          case 'PBB':
            transition.to = 4;
            transition.headReplace = 'PYB';
            transition.tapeDirection = 'RRS';
            break;
          case 'UBB':
            transition.to = 4;
            transition.headReplace = 'UOB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 7:
        switch (transition.head) {
          case 'OBB':
            transition.to = 8;
            transition.headReplace = 'OOB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 8;
            transition.headReplace = 'YYB';
            transition.tapeDirection = 'SRS';
            break;
          case 'CBB':
            transition.to = 10;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 10;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'IBB':
            transition.to = 10;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'TBB':
            transition.to = 10;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 8:
        switch (transition.head) {
          case 'OBB':
            transition.to = 9;
            transition.headReplace = 'OTB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 9;
            transition.headReplace = 'YIB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 9:
        switch (transition.head) {
          case 'OBB':
            transition.to = 7;
            transition.headReplace = 'OTB';
            transition.tapeDirection = 'RRS';
            break;
          case 'YBB':
            transition.to = 7;
            transition.headReplace = 'YIB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 10:
        switch (transition.head) {
          case 'IBB':
            transition.to = 11;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'TBB':
            transition.to = 11;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'CBB':
            transition.to = 15;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 74;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 11:
        switch (transition.head) {
          case 'IBB':
            transition.to = 12;
            transition.headReplace = 'IIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'TBB':
            transition.to = 12;
            transition.headReplace = 'TTB';
            transition.tapeDirection = 'RRS';
            break;
          case 'CBB':
            transition.to = 15;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 74;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 12:
        switch (transition.head) {
          case 'IBB':
            transition.to = 13;
            transition.headReplace = 'IIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'TBB':
            transition.to = 13;
            transition.headReplace = 'TTB';
            transition.tapeDirection = 'RRS';
            break;
          case 'CBB':
            transition.to = 15;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 74;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 13:
        switch (transition.head) {
          case 'IBB':
            transition.to = 14;
            transition.headReplace = 'IIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'TBB':
            transition.to = 14;
            transition.headReplace = 'TTB';
            transition.tapeDirection = 'RRS';
            break;
          case 'CBB':
            transition.to = 15;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 74;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 14:
        switch (transition.head) {
          case 'IBB':
            transition.to = 10;
            transition.headReplace = 'IIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'TBB':
            transition.to = 10;
            transition.headReplace = 'TTB';
            transition.tapeDirection = 'RRS';
            break;
          case 'CBB':
            transition.to = 15;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'KBB':
            transition.to = 74;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      case 15:
        switch (transition.head) {
          case 'CBB':
            transition.to = 16;
            transition.headReplace = 'COB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 16:
        switch (transition.head) {
          case 'CBB':
            transition.to = 17;
            transition.headReplace = 'COB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 17:
        switch (transition.head) {
          case 'CBB':
            transition.to = 18;
            transition.headReplace = 'COB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 18:
        switch (transition.head) {
          case 'CBB':
            transition.to = 19;
            transition.headReplace = 'CIB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 19:
        switch (transition.head) {
          case 'CBB':
            transition.to = 20;
            transition.headReplace = 'CIB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 20:
        switch (transition.head) {
          case 'FBB':
            transition.to = 150;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      // Celcius To Yelvin
      case 21:
        switch (transition.head) {
          case 'CBB':
            transition.to = 22;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 22:
        [transition.to, transition.headReplace, transition.tapeDirection] =
          goLeftFill(transition.head, 22);
        if (transition.to === 0) {
          [transition.to, transition.headReplace, transition.tapeDirection] = [
            23,
            'BPB',
            'SRS',
          ];
        }
        break;
      case 23:
        console.log(transition.head);
        switch (transition.head) {
          case 'BBB':
            transition.to = 24;
            transition.headReplace = 'BPB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 24:
        switch (transition.head) {
          case 'BBB':
            transition.to = 25;
            transition.headReplace = 'BPB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 25:
        switch (transition.head) {
          case 'BBB':
            transition.to = 26;
            transition.headReplace = 'BYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 26:
        switch (transition.head) {
          case 'BBB':
            transition.to = 27;
            transition.headReplace = 'BYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 27:
        switch (transition.head) {
          case 'BBB':
            transition.to = 28;
            transition.headReplace = 'BYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 28:
        switch (transition.head) {
          case 'BBB':
            transition.to = 29;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 29:
        switch (transition.head) {
          case 'BBB':
            transition.to = 30;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 30:
        switch (transition.head) {
          case 'BBB':
            transition.to = 150;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 31:
        switch (transition.head) {
          case 'CBB':
            transition.to = 32;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'KBB':
            transition.to = 32;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'LSS';
        }
        break;
      case 32:
        [transition.to, transition.headReplace, transition.tapeDirection] =
          goLeft(transition.head, 32);
        if (transition.to === 0) {
          switch (transition.head) {
            case 'FBB':
              transition.to = 32;
              transition.headReplace = 'FBB';
              transition.tapeDirection = 'LSS';
              break;
            case 'BBB':
              transition.to = 33;
              transition.headReplace = 'BBB';
              transition.tapeDirection = 'RSS';
              break;
          }
        }
        break;
      case 33:
        switch (transition.head) {
          case 'PBB':
            transition.to = 34;
            transition.headReplace = 'PBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'UBB':
            transition.to = 34;
            transition.headReplace = 'UBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'OBB':
            transition.to = 47;
            transition.headReplace = 'OBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'IBB':
            transition.to = 47;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'YBB':
            transition.to = 47;
            transition.headReplace = 'YBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'TBB':
            transition.to = 47;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'FBB':
            transition.to = 47;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 34:
        switch (transition.head) {
          case 'PBB':
            transition.to = 35;
            transition.headReplace = 'PPB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 35;
            transition.headReplace = 'UUB';
            transition.tapeDirection = 'SRS';
            break;
          case 'OBB':
            transition.to = 37;
            transition.headReplace = 'OBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'IBB':
            transition.to = 37;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'YBB':
            transition.to = 37;
            transition.headReplace = 'YBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'TBB':
            transition.to = 37;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'FBB':
            transition.to = 37;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 35:
        switch (transition.head) {
          case 'PBB':
            transition.to = 36;
            transition.headReplace = 'POB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 36;
            transition.headReplace = 'UYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 36:
        switch (transition.head) {
          case 'PBB':
            transition.to = 33;
            transition.headReplace = 'PIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 33;
            transition.headReplace = 'UTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 37:
        switch (transition.head) {
          case 'PBB':
            transition.to = 38;
            transition.headReplace = 'POB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 38;
            transition.headReplace = 'UYB';
            transition.tapeDirection = 'SRS';
        }
        break;
      case 38:
        switch (transition.head) {
          case 'PBB':
            transition.to = 39;
            transition.headReplace = 'POB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 39;
            transition.headReplace = 'UYB';
            transition.tapeDirection = 'SRS';
        }
        break;
      case 39:
        switch (transition.head) {
          case 'PBB':
            transition.to = 40;
            transition.headReplace = 'POB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 40;
            transition.headReplace = 'UYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 40:
        switch (transition.head) {
          case 'PBB':
            transition.to = 41;
            transition.headReplace = 'POB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 41;
            transition.headReplace = 'UYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 41:
        switch (transition.head) {
          case 'PBB':
            transition.to = 42;
            transition.headReplace = 'POB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 42;
            transition.headReplace = 'UYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 42:
        switch (transition.head) {
          case 'PBB':
            transition.to = 43;
            transition.headReplace = 'PIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 43;
            transition.headReplace = 'UTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 43:
        switch (transition.head) {
          case 'PBB':
            transition.to = 44;
            transition.headReplace = 'PIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 44;
            transition.headReplace = 'UTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 44:
        switch (transition.head) {
          case 'PBB':
            transition.to = 45;
            transition.headReplace = 'PIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 45;
            transition.headReplace = 'UTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 45:
        switch (transition.head) {
          case 'PBB':
            transition.to = 46;
            transition.headReplace = 'PIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'UBB':
            transition.to = 46;
            transition.headReplace = 'UTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 46:
        switch (transition.head) {
          case 'PBB':
            transition.to = 47;
            transition.headReplace = 'PIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'UBB':
            transition.to = 47;
            transition.headReplace = 'UTB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 47:
        switch (transition.head) {
          case 'OBB':
            transition.to = 48;
            transition.headReplace = 'OBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'YBB':
            transition.to = 48;
            transition.headReplace = 'YBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'IBB':
            transition.to = 56;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'TBB':
            transition.to = 56;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'SSS';
            break;
          case 'FBB':
            transition.to = 56;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 48:
        switch (transition.head) {
          case 'OBB':
            transition.to = 49;
            transition.headReplace = 'OOB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 49;
            transition.headReplace = 'YYB';
            transition.tapeDirection = 'SRS';
            break;
          case 'IBB':
            transition.to = 50;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'TBB':
            transition.to = 50;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'FBB':
            transition.to = 50;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 49:
        switch (transition.head) {
          case 'OBB':
            transition.to = 47;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'YBB':
            transition.to = 47;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 50:
        switch (transition.head) {
          case 'OBB':
            transition.to = 51;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 51;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 51:
        switch (transition.head) {
          case 'OBB':
            transition.to = 52;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 52;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 52:
        switch (transition.head) {
          case 'OBB':
            transition.to = 53;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 53;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'SRS';

            break;
        }
        break;
      case 53:
        switch (transition.head) {
          case 'OBB':
            transition.to = 54;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 54;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 54:
        switch (transition.head) {
          case 'OBB':
            transition.to = 55;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'YBB':
            transition.to = 55;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 55:
        switch (transition.head) {
          case 'OBB':
            transition.to = 56;
            transition.headReplace = 'OIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'YBB':
            transition.to = 56;
            transition.headReplace = 'YTB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 56:
        switch (transition.head) {
          case 'IBB':
            transition.to = 57;
            transition.headReplace = 'IIB';
            transition.tapeDirection = 'RRS';
            break;
          case 'TBB':
            transition.to = 57;
            transition.headReplace = 'TTB';
            transition.tapeDirection = 'RRS';
            break;
          case 'FBB':
            transition.to = 58;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 57:
        switch (transition.head) {
          case 'IBB':
            transition.to = 56;
            transition.headReplace = 'IBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'TBB':
            transition.to = 56;
            transition.headReplace = 'TBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'FBB':
            transition.to = 56;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 58:
        switch (transition.head) {
          case 'FBB':
            transition.to = 59;
            transition.headReplace = 'FYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 59:
        switch (transition.head) {
          case 'FBB':
            transition.to = 60;
            transition.headReplace = 'FYB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 60:
        switch (transition.head) {
          case 'FBB':
            transition.to = 61;
            transition.headReplace = 'FIB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 61:
        switch (transition.head) {
          case 'FBB':
            transition.to = 62;
            transition.headReplace = 'FIB';
            transition.tapeDirection = 'RRS';
            break;
        }
        break;
      case 62:
        switch (transition.head) {
          case 'CBB':
            transition.to = 150;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'KBB':
            transition.to = 22;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'RSS';
            break;
        }
        break;
      // Kelvin
      case 63:
        switch (transition.head) {
          case 'CBB':
            transition.to = 64;
            transition.headReplace = 'CBB';
            transition.tapeDirection = 'LSS';
            break;
          case 'FBB':
            transition.to = 73;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 64:
        [transition.to, transition.headReplace, transition.tapeDirection] =
          goLeftFill(transition.head, 64);
        if (transition.to === 0) {
          switch (transition.head) {
            case 'KBB':
              transition.to = 64;
              transition.headReplace = 'KBB';
              transition.tapeDirection = 'LSS';
              break;
            case 'BBB':
              transition.to = 65;
              transition.headReplace = 'BUB';
              transition.tapeDirection = 'SRS';
              break;
          }
        }
        break;
      case 65:
        switch (transition.head) {
          case 'BBB':
            transition.to = 66;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 66:
        switch (transition.head) {
          case 'BBB':
            transition.to = 67;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 67:
        switch (transition.head) {
          case 'BBB':
            transition.to = 68;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 68:
        switch (transition.head) {
          case 'BBB':
            transition.to = 69;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 69:
        switch (transition.head) {
          case 'BBB':
            transition.to = 70;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 70:
        switch (transition.head) {
          case 'BBB':
            transition.to = 71;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 71:
        switch (transition.head) {
          case 'BBB':
            transition.to = 72;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 72:
        switch (transition.head) {
          case 'BBB':
            transition.to = 150;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 73:
        switch (transition.head) {
          case 'KBB':
            transition.to = 3;
            transition.headReplace = 'KBB';
            transition.tapeDirection = 'LSS';
            break;
        }
        break;
      case 74:
        switch (transition.head) {
          case 'FBB':
            transition.to = 74;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'RSS';
            break;
          case 'BBB':
            transition.to = 75;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 75:
        switch (transition.head) {
          case 'BBB':
            transition.to = 76;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 76:
        switch (transition.head) {
          case 'BBB':
            transition.to = 77;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 77:
        switch (transition.head) {
          case 'BBB':
            transition.to = 78;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 78:
        switch (transition.head) {
          case 'BBB':
            transition.to = 79;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 79:
        switch (transition.head) {
          case 'BBB':
            transition.to = 80;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 80:
        switch (transition.head) {
          case 'BBB':
            transition.to = 81;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 81:
        switch (transition.head) {
          case 'BBB':
            transition.to = 82;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 82:
        switch (transition.head) {
          case 'BBB':
            transition.to = 150;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
    }

    return transition.to === -1 ? false : transition;
  };
}

const goLeft = (head: string, state: number): [number, string, string] => {
  switch (head) {
    case 'IBB':
      return [state, 'IBB', 'LSS'];
    case 'OBB':
      return [state, 'OBB', 'LSS'];
    case 'PBB':
      return [state, 'PBB', 'LSS'];
    case 'TBB':
      return [state, 'TBB', 'LSS'];
    case 'YBB':
      return [state, 'YBB', 'LSS'];
    case 'UBB':
      return [state, 'UBB', 'LSS'];
  }
  return [0, '', ''];
};

const goLeftFill = (head: string, state: number): [number, string, string] => {
  switch (head) {
    case 'IBB':
      return [state, 'IIB', 'LRS'];
    case 'OBB':
      return [state, 'OOB', 'LRS'];
    case 'PBB':
      return [state, 'PPB', 'LRS'];
    case 'TBB':
      return [state, 'TTB', 'LRS'];
    case 'YBB':
      return [state, 'YYB', 'LRS'];
    case 'UBB':
      return [state, 'UUB', 'LRS'];
  }
  return [0, '', ''];
};

const resolveInput = (input: Temperature): Symbol[] => {
  let inputstring = new Array<string>();
  while (input.temperature !== 0) {
    if (input.temperature > 0) {
      if (input.temperature >= 100) {
        inputstring.push('P');
        input.temperature -= 100;
      } else if (input.temperature >= 10) {
        inputstring.push('O');
        input.temperature -= 10;
      } else {
        inputstring.push('I');
        input.temperature -= 1;
      }
    } else if (input.temperature < 0) {
      if (input.temperature <= -100) {
        inputstring.push('U');
        input.temperature += 100;
      } else if (input.temperature <= -10) {
        inputstring.push('Y');
        input.temperature += 10;
      } else {
        inputstring.push('T');
        input.temperature += 1;
      }
    }
  }
  inputstring.push(input.from);
  inputstring.push(input.to);

  return inputstring as Symbol[];
};
