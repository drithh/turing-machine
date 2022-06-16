import { FormData, Transition } from '../type';
import { AdditionMultiTrack } from './addition-multi-track';

export type TuringMachinesResult = {
  transitions: Transition[];
  totalTape: number;
  inputSymbols: string[];
};

export class TuringMachines {
  constructor(formData: FormData) {
    this.formData = formData;
  }
  private formData: FormData;

  private transitions = new Array<Transition>();

  public run() {
    const turingMachine = new AdditionMultiTrack({
      input1: 20,
      input2: 5,
    });

    turingMachine.run();
    const turingMachineResult: TuringMachinesResult = {
      transitions: turingMachine.getTransitions(),
      totalTape: turingMachine.getTotalTape(),
      inputSymbols: turingMachine.getInputSymbols(),
    };
    return turingMachineResult;
  }
}
