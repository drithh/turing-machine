import { Symbol, Direction, Transition, Temperature } from '../type';
import { ThreeTape } from './tape';

export class TemperatureConversionMultiTape {
  public setup(inputSymbols: Temperature) {
    this.inputSymbols = resolveInput(inputSymbols);
    this.tapes = new ThreeTape(resolveInput(inputSymbols));
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
    return TemperatureConversionMultiTape.totalTape;
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
            transition.to = 99;
            transition.headReplace = 'FBB';
            transition.tapeDirection = 'RSS';
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
            transition.to = 99;
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
            transition.to = 99;
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
            transition.to = 99;
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
            transition.to = 99;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
        }
        break;
      case 99:
        switch (transition.head) {
          case 'BBB':
            transition.to = 100;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SLS';
            break;
        }
        break;
      case 100:
        switch (transition.head) {
          case 'BPB':
            transition.to = 100;
            transition.headReplace = 'BEP';
            transition.tapeDirection = 'SLR';
            break;
          case 'BUB':
            transition.to = 100;
            transition.headReplace = 'BUB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BOB':
            transition.to = 100;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BYB':
            transition.to = 100;
            transition.headReplace = 'BYB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BIB':
            transition.to = 100;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BTB':
            transition.to = 100;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BBB':
            transition.to = 101;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SRL';
            break;
        }
        break;
      case 101:
        switch (transition.head) {
          case 'BUP':
            transition.to = 101;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SRL';
            break;
          case 'BOP':
            transition.to = 101;
            transition.headReplace = 'BOP';
            transition.tapeDirection = 'SRS';
            break;
          case 'BYP':
            transition.to = 101;
            transition.headReplace = 'BYP';
            transition.tapeDirection = 'SRS';
            break;
          case 'BIP':
            transition.to = 101;
            transition.headReplace = 'BIP';
            transition.tapeDirection = 'SRS';
            break;
          case 'BTP':
            transition.to = 101;
            transition.headReplace = 'BTP';
            transition.tapeDirection = 'SRS';
            break;
          case 'BEP':
            transition.to = 101;
            transition.headReplace = 'BEP';
            transition.tapeDirection = 'SRS';
            break;
          case 'BUB':
            transition.to = 101;
            transition.headReplace = 'BEU';
            transition.tapeDirection = 'SRR';
            break;
          case 'BOB':
            transition.to = 101;
            transition.headReplace = 'BOB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BYB':
            transition.to = 101;
            transition.headReplace = 'BYB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BIB':
            transition.to = 101;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BTB':
            transition.to = 101;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BEB':
            transition.to = 101;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BBP':
            transition.to = 102;
            transition.headReplace = 'BBP';
            transition.tapeDirection = 'SLR';
            break;
          case 'BBB':
            transition.to = 102;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SLS';
            break;
        }
        break;
      case 102:
        switch (transition.head) {
          case 'BOB':
            transition.to = 102;
            transition.headReplace = 'BEO';
            transition.tapeDirection = 'SLR';
            break;
          case 'BYB':
            transition.to = 102;
            transition.headReplace = 'BYB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BIB':
            transition.to = 102;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BTB':
            transition.to = 102;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BEB':
            transition.to = 102;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BBB':
            transition.to = 103;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SRL';
            break;
        }
        break;
      case 103:
        switch (transition.head) {
          case 'BYO':
            transition.to = 103;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SRL';
            break;
          case 'BIO':
            transition.to = 103;
            transition.headReplace = 'BIO';
            transition.tapeDirection = 'SRS';
            break;
          case 'BTO':
            transition.to = 103;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SRS';
            break;
          case 'BEO':
            transition.to = 103;
            transition.headReplace = 'BEO';
            transition.tapeDirection = 'SRS';
            break;
          case 'BYB':
            transition.to = 103;
            transition.headReplace = 'BEY';
            transition.tapeDirection = 'SRR';
            break;
          case 'BIB':
            transition.to = 103;
            transition.headReplace = 'BIB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BTB':
            transition.to = 103;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BEB':
            transition.to = 103;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BYU':
            transition.to = 103;
            transition.headReplace = 'BYU';
            transition.tapeDirection = 'SSR';
            break;
          case 'BIU':
            transition.to = 103;
            transition.headReplace = 'BIU';
            transition.tapeDirection = 'SSR';
            break;
          case 'BTU':
            transition.to = 103;
            transition.headReplace = 'BTU';
            transition.tapeDirection = 'SSR';
            break;
          case 'BEU':
            transition.to = 103;
            transition.headReplace = 'BEU';
            transition.tapeDirection = 'SSR';
            break;
          case 'BIP':
            transition.to = 103;
            transition.headReplace = 'BIP';
            transition.tapeDirection = 'SSR';
            break;
          case 'BTP':
            transition.to = 103;
            transition.headReplace = 'BTP';
            transition.tapeDirection = 'SSR';
            break;
          case 'BEP':
            transition.to = 103;
            transition.headReplace = 'BEP';
            transition.tapeDirection = 'SSR';
            break;
          case 'BYP':
            transition.to = 104;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
          case 'BBO':
            transition.to = 112;
            transition.headReplace = 'BBO';
            transition.tapeDirection = 'SLR';
            break;
          case 'BBB':
            transition.to = 112;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SLS';
            break;
        }
        break;
      case 104:
        switch (transition.head) {
          case 'BYB':
            transition.to = 104;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 105:
        switch (transition.head) {
          case 'BYB':
            transition.to = 105;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 106:
        switch (transition.head) {
          case 'BYB':
            transition.to = 106;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 107:
        switch (transition.head) {
          case 'BYB':
            transition.to = 107;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 108:
        switch (transition.head) {
          case 'BYB':
            transition.to = 108;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 109:
        switch (transition.head) {
          case 'BYB':
            transition.to = 109;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 110:
        switch (transition.head) {
          case 'BYB':
            transition.to = 111;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 111:
        switch (transition.head) {
          case 'BYB':
            transition.to = 103;
            transition.headReplace = 'BYO';
            transition.tapeDirection = 'SSS';
            break;
        }
        break;
      case 112:
        switch (transition.head) {
          case 'BIB':
            transition.to = 112;
            transition.headReplace = 'BEI';
            transition.tapeDirection = 'SLR';
            break;
          case 'BTB':
            transition.to = 112;
            transition.headReplace = 'BTB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BEB':
            transition.to = 112;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SLS';
            break;
          case 'BBB':
            transition.to = 113;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SRL';
            break;
        }
        break;
      case 113:
        switch (transition.head) {
          case 'BTI':
            transition.to = 113;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SRL';
            break;
          case 'BEI':
            transition.to = 113;
            transition.headReplace = 'BEI';
            transition.tapeDirection = 'SRS';
            break;
          case 'BTB':
            transition.to = 113;
            transition.headReplace = 'BTT';
            transition.tapeDirection = 'SRR';
            break;
          case 'BEB':
            transition.to = 113;
            transition.headReplace = 'BEB';
            transition.tapeDirection = 'SRS';
            break;
          case 'BTY':
            transition.to = 113;
            transition.headReplace = 'BTY';
            transition.tapeDirection = 'SSR';
            break;
          case 'BEY':
            transition.to = 113;
            transition.headReplace = 'BEY';
            transition.tapeDirection = 'SSR';
            break;
          case 'BEP':
            transition.to = 113;
            transition.headReplace = 'BEP';
            transition.tapeDirection = 'SSR';
            break;
          case 'BEO':
            transition.to = 113;
            transition.headReplace = 'BEO';
            transition.tapeDirection = 'SSR';
            break;
          case 'BTO':
            transition.to = 114;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
          case 'BTP':
            transition.to = 122;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
          case 'BBB':
            transition.to = 131;
            transition.headReplace = 'BBB';
            transition.tapeDirection = 'SSR';
            break;
          case 'BBI':
            transition.to = 131;
            transition.headReplace = 'BBI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 114:
        switch (transition.head) {
          case 'BTB':
            transition.to = 115;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 115:
        switch (transition.head) {
          case 'BTB':
            transition.to = 116;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 116:
        switch (transition.head) {
          case 'BTB':
            transition.to = 117;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 117:
        switch (transition.head) {
          case 'BTB':
            transition.to = 118;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 118:
        switch (transition.head) {
          case 'BTB':
            transition.to = 119;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 119:
        switch (transition.head) {
          case 'BTB':
            transition.to = 120;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 120:
        switch (transition.head) {
          case 'BTB':
            transition.to = 121;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 121:
        switch (transition.head) {
          case 'BTB':
            transition.to = 113;
            transition.headReplace = 'BTI';
            transition.tapeDirection = 'SSS';
        }
        break;
      case 122:
        switch (transition.head) {
          case 'BTB':
            transition.to = 123;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 123:
        switch (transition.head) {
          case 'BTB':
            transition.to = 124;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 124:
        switch (transition.head) {
          case 'BTB':
            transition.to = 125;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 125:
        switch (transition.head) {
          case 'BTB':
            transition.to = 126;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 126:
        switch (transition.head) {
          case 'BTB':
            transition.to = 127;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 127:
        switch (transition.head) {
          case 'BTB':
            transition.to = 128;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 128:
        switch (transition.head) {
          case 'BTB':
            transition.to = 129;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 129:
        switch (transition.head) {
          case 'BTB':
            transition.to = 130;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
            break;
        }
        break;
      case 130:
        switch (transition.head) {
          case 'BTB':
            transition.to = 113;
            transition.headReplace = 'BTO';
            transition.tapeDirection = 'SSR';
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
  let temperature = input.temperature;
  let inputstring = new Array<string>();
  while (temperature !== 0) {
    if (temperature > 0) {
      if (temperature >= 100) {
        inputstring.push('P');
        temperature -= 100;
      } else if (temperature >= 10) {
        inputstring.push('O');
        temperature -= 10;
      } else {
        inputstring.push('I');
        temperature -= 1;
      }
    } else if (temperature < 0) {
      if (temperature <= -100) {
        inputstring.push('U');
        temperature += 100;
      } else if (temperature <= -10) {
        inputstring.push('Y');
        temperature += 10;
      } else {
        inputstring.push('T');
        temperature += 1;
      }
    }
  }
  inputstring.push(input.from);
  inputstring.push(input.to);

  return inputstring as Symbol[];
};
