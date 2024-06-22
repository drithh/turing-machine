import { Symbol, Direction } from '../type';

export class Tape {
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

export class MultiTape {
  protected tapes: Tape[];
  constructor(inputSymbols: Symbol[], tapeCount: number) {
    this.tapes = [new Tape(inputSymbols)];
    for (let i = 1; i < tapeCount; i++) {
      this.tapes.push(new Tape());
    }
    this.tapes.length = tapeCount;
  }
  public length = 0;

  public moveHead(directions: Direction[]) {
    directions.forEach((direction, index) => {
      this.tapes[index].moveHead(direction);
    });
  }

  public write(symbols: Symbol[]) {
    symbols.forEach((symbol, index) => {
      this.tapes[index].write(symbol);
    });
  }

  public read() {
    return this.tapes.map((tape) => tape.read());
  }

  public getHeadAndValue() {
    return this.tapes.map((tape) => tape.getHeadAndValue());
  }

  public all() {
    return this.tapes.map((tape) => tape.all());
  }
}
