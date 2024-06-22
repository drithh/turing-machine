import { resolveDirection, resolveSymbol } from '../../util/resolver';
import { Symbol, Transition, Inputs } from '../type';
import { Strategy } from './strategy';
import { MultiTape } from './tape';

export class TuringBase {
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setup(inputs: string) {
    const symbols = resolveSymbol(inputs);
    this.inputSymbols = symbols;
    this.tapes = new MultiTape(resolveSymbol(inputs), this.strategy.totalTape);
  }

  protected strategy: Strategy;
  // protected totalTape: number = 0;
  protected inputSymbols: Symbol[] = [];
  protected tapes: MultiTape = new MultiTape([], 0);

  protected transitions = new Array<Transition>();
  protected lastTransition: Transition | undefined;

  public async run() {
    do {
      const transition = this.getNextTransition(
        this.lastTransition ? this.lastTransition.to : 0
      );
      if (transition) {
        this.tapes.write(resolveSymbol(transition.headReplace));
        this.tapes.moveHead(resolveDirection(transition.tapeDirection));

        this.transitions.push(transition);
        this.lastTransition = transition;
      } else {
        this.lastTransition = undefined;
      }
    } while (this.lastTransition !== undefined);
  }

  public getResult() {
    return this.tapes.all();
  }

  public getTransitions() {
    return this.transitions;
  }

  public getTotalTape() {
    return this.strategy?.totalTape || 0;
  }

  public getInputSymbols() {
    return this.inputSymbols;
  }

  public getLastHead() {
    const tapeCount = this.tapes.length;
    const headPositions: number[] = new Array(tapeCount).fill(0);

    this.transitions.forEach((transition) => {
      if (transition) {
        const directions = resolveDirection(transition.tapeDirection);

        directions.forEach((direction, index) => {
          if (direction === 'L') {
            headPositions[index]--;
          } else if (direction === 'R') {
            headPositions[index]++;
          }
        });
      }
    });

    return headPositions;
  }

  protected getNextTransition = (
    currentHead: number
  ): Transition | undefined => {
    const currentTransition: Transition = {
      from: currentHead,
      to: -1,
      head: this.tapes.read().reduce((acc, curr) => acc + curr, ''),
      headReplace: '',
      tapeDirection: '',
    };

    const nextTransition = this.strategy?.getNextTransition(currentTransition);

    return nextTransition || undefined;
  };
}
