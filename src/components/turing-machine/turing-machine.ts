import { FormData, Transition, Symbol } from '../type';
import { AdditionMultiTape } from './addition-multitape';
import { AdditionSingleTrack } from './addition-singletrack';
import { DivisionMultiTape } from './division-multitape';
import { DivisionSingleTrack } from './division-singletrack';
import { MultiplicationMultiTape } from './multiplication-multitape';
import { MultiplicationSingleTrack } from './multiplication-singletrack';
import { SubtractionMultiTape } from './subtraction-multitape';
import { SubtractionSingleTrack } from './subtraction-singletrack';

export type TuringMachinesResult = {
  transitions: Transition[];
  inputSymbols: string[];
  TapeResult: Symbol[][];
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
    console.log(turingMachineName);

    if (turingMachineName === 'AdditionMultiTape') {
      this.turingMachine = new AdditionMultiTape();
    } else if (turingMachineName === 'AdditionSingleTrack') {
      this.turingMachine = new AdditionSingleTrack();
    } else if (turingMachineName === 'SubtractionMultiTape') {
      this.turingMachine = new SubtractionMultiTape();
    } else if (turingMachineName === 'SubtractionSingleTrack') {
      this.turingMachine = new SubtractionSingleTrack();
    } else if (turingMachineName === 'MultiplicationMultiTape') {
      this.turingMachine = new MultiplicationMultiTape();
    } else if (turingMachineName === 'MultiplicationSingleTrack') {
      this.turingMachine = new MultiplicationSingleTrack();
    } else if (turingMachineName === 'DivisionMultiTape') {
      this.turingMachine = new DivisionMultiTape();
    } else if (turingMachineName === 'DivisionSingleTrack') {
      this.turingMachine = new DivisionSingleTrack();
    }
  };

  private turingMachineName = '';

  private turingMachine:
    | AdditionMultiTape
    | AdditionSingleTrack
    | SubtractionMultiTape
    | SubtractionSingleTrack
    | MultiplicationMultiTape
    | MultiplicationSingleTrack
    | DivisionMultiTape
    | DivisionSingleTrack
    | undefined;

  public setFormData = (formData: FormData) => {
    this.formData = formData;
  };

  public getTotalTape() {
    if (this.turingMachineName === 'AdditionMultiTape') {
      return AdditionMultiTape.totalTape;
    } else if (this.turingMachineName === 'AdditionSingleTrack') {
      return AdditionSingleTrack.totalTape;
    } else if (this.turingMachineName === 'SubtractionMultiTape') {
      return SubtractionMultiTape.totalTape;
    } else if (this.turingMachineName === 'SubtractionSingleTrack') {
      return SubtractionSingleTrack.totalTape;
    } else if (this.turingMachineName === 'MultiplicationMultiTape') {
      return MultiplicationMultiTape.totalTape;
    } else if (this.turingMachineName === 'MultiplicationSingleTrack') {
      return MultiplicationSingleTrack.totalTape;
    } else if (this.turingMachineName === 'DivisionMultiTape') {
      return DivisionMultiTape.totalTape;
    } else if (this.turingMachineName === 'DivisionSingleTrack') {
      return DivisionSingleTrack.totalTape;
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
        TapeResult: this.turingMachine.getResult(),
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
