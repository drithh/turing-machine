import { Transition } from '../type';

export abstract class Strategy {
  public totalTape: number = 0;
  public getNextTransition(transition: Transition): Transition | undefined {
    throw new Error('Method not implemented.');
  }
}
