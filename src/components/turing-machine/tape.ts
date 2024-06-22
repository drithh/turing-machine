import { Symbol, Direction } from '../type';

export class OneTape {
  constructor(symbols: Symbol[] = ['B']) {
    if (symbols.length === 0) {
      symbols = ['B'];
    }
    this.tape = symbols;
  }
  private tape = new Array<Symbol>();
  private head = 0;

  public moveHead(direction: Direction) {
    if (direction === 'L') {
      this.head--;
    } else if (direction === 'R') {
      this.head++;
    }
    if (this.head < 0) {
      this.head = 0;
      this.tape = ['B', ...this.tape];
    }
    if (this.tape[this.head] === undefined) {
      this.tape[this.head] = 'B';
    }
  }

  public write(symbol: Symbol) {
    this.tape[this.head] = symbol;
  }

  public read() {
    return this.tape[this.head];
  }

  public getHeadAndValue() {
    return {
      head: this.head,
      value: this.read(),
    };
  }

  public all() {
    return this.tape;
  }
}

export class TwoTape {
  constructor(inputSymbols: Symbol[]) {
    this.tape1 = new OneTape(inputSymbols);
  }
  private tape1: OneTape;
  private tape2 = new OneTape();

  public moveHead(directions: Array<Direction>) {
    this.tape1.moveHead(directions[0]);
    this.tape2.moveHead(directions[1]);
  }

  public write(symbols: Symbol[]) {
    this.tape1.write(symbols[0]);
    this.tape2.write(symbols[1]);
  }

  public read() {
    return [this.tape1.read(), this.tape2.read()];
  }

  public getHeadAndValue() {
    return {
      tape1: this.tape1.getHeadAndValue(),
      tape2: this.tape2.getHeadAndValue(),
    };
  }

  public all() {
    return {
      tape1: this.tape1.all(),
      tape2: this.tape2.all(),
    };
  }
}

export class ThreeTape {
  constructor(inputSymbols: Symbol[]) {
    this.tape1 = new OneTape(inputSymbols);
  }
  private tape1: OneTape;
  private tape2 = new OneTape();
  private tape3 = new OneTape();

  public moveHead(directions: Array<Direction>) {
    this.tape1.moveHead(directions[0]);
    this.tape2.moveHead(directions[1]);
    this.tape3.moveHead(directions[2]);
  }

  public write(symbols: Symbol[]) {
    this.tape1.write(symbols[0]);
    this.tape2.write(symbols[1]);
    this.tape3.write(symbols[2]);
  }

  public read() {
    return [this.tape1.read(), this.tape2.read(), this.tape3.read()];
  }

  public all() {
    return {
      tape1: this.tape1.all(),
      tape2: this.tape2.all(),
      tape3: this.tape3.all(),
    };
  }
}
