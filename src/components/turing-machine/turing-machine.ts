import { FormData, Transition, Symbol } from '../type';
import { AdditionMultiTape } from './addition-multitape';
import { AdditionSingletrack } from './addition-singletrack';
import { SubtractionMultiTape } from './subtraction-multitape';
import { SubtractionSingletrack } from './subtraction-singletrack';

export type TuringMachinesResult = {
  transitions: Transition[];
  inputSymbols: string[];
  tapeResult: Symbol[][];
  lastHead: number[];
};

export class TuringMachines {
  constructor(formData: FormData) {
    this.formData = formData;
    if (this.formData.operation !== 'Select Operation') {
      this.turingMachineName = convertOperationFormData(formData.operation);
      this.createturingMachine(this.turingMachineName);
    }
  }

  public createturingMachine = (turingMachineName: string) => {
    if (turingMachineName === 'AdditionMultiTape') {
      this.turingMachine = new AdditionMultiTape();
    } else if (turingMachineName === 'AdditionSingleTrack') {
      console.log(turingMachineName);

      this.turingMachine = new AdditionSingletrack();
    } else if (turingMachineName === 'SubtractionMultiTape') {
      this.turingMachine = new SubtractionMultiTape();
    } else if (turingMachineName === 'SubtractionSingleTrack') {
      this.turingMachine = new SubtractionSingletrack();
    }
  };

  private turingMachineName = '';

  private turingMachine:
    | AdditionMultiTape
    | AdditionSingletrack
    | SubtractionMultiTape
    | SubtractionSingletrack
    | undefined;

  public setFormData = (formData: FormData) => {
    this.formData = formData;
  };

  public getTotalTape() {
    if (this.turingMachineName === 'AdditionMultiTape') {
      return AdditionMultiTape.totalTape;
    } else if (this.turingMachineName === 'AdditionSingletrack') {
      return AdditionSingletrack.totalTape;
    } else if (this.turingMachineName === 'SubtractionMultiTape') {
      return SubtractionMultiTape.totalTape;
    } else if (this.turingMachineName === 'SubtractionSingletrack') {
      return SubtractionSingletrack.totalTape;
    } else {
      return 0;
    }
  }

  public getOperation() {
    return this.formData.operation;
  }

  public getTransitions() {
    if (this.turingMachine) {
      return this.turingMachine.getTransitions();
    }
    return [];
  }

  public getActionType() {
    return this.formData.actionType;
  }

  private formData: FormData;

  private transitions = new Array<Transition>();

  public run() {
    if (this.turingMachine) {
      this.turingMachine.setup({
        input1: this.formData.data.input1,
        input2: this.formData.data.input2,
      });

      this.turingMachine.run();
      const turingMachineResult: TuringMachinesResult = {
        transitions: this.turingMachine.getTransitions(),
        inputSymbols: this.turingMachine.getInputSymbols(),
        tapeResult: this.turingMachine.getResult(),
        lastHead: this.turingMachine.getLastHead(),
      };
      console.log(turingMachineResult);
      return turingMachineResult;
    }
  }
}

const convertOperationFormData = (operation: string) => {
  return operation.replace(/ /g, '').replace('-', '');
};
