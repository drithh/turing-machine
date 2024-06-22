import { FormData, Transition, Symbol } from '../type';
import { AdditionMultiTape } from './addition-multitape';
import { AdditionSingleTrack } from './addition-singletrack';
import { Strategy } from './strategy';
import { TuringBase } from './turing-base';
// import { AdditionSingleTrack } from './addition-singletrack';
// import { BinaryLogarithmMultiTape } from './binarylogarithm-multitape';
// import { BinaryLogarithmMultiTrack } from './binarylogarithm-multitrack';
// import { DivisionMultiTape } from './division-multitape';
// import { DivisionSingleTrack } from './division-singletrack';
// import { FactorialMultiTape } from './factorial-multitape';
// import { FactorialMultiTrack } from './factorial-multitrack';
// import { MultiplicationMultiTape } from './multiplication-multitape';
// import { MultiplicationSingleTrack } from './multiplication-singletrack';
// import { PowerMultiTape } from './power-multitape';
// import { PowerMultiTrack } from './power-multitrack';
// import { SubtractionMultiTape } from './subtraction-multitape';
// import { SubtractionSingleTrack } from './subtraction-singletrack';

export type TuringMachinesResult = {
  transitions: Transition[];
  inputSymbols: string[];
  TapeResult: Symbol[][];
  lastHead: number[];
};

export class TuringMachines {
  constructor(operation: string) {
    if (operation !== 'Select Operation') {
      this.turingMachineName = convertOperationFormData(operation);
      const strategy = getStrategy(this.turingMachineName);
      if (strategy) {
        this.turingMachine = new TuringBase(strategy);
      } else {
        throw new Error('Strategy not found');
      }
    }
    this.formData = {
      operation: operation,
      data: '',
    };
  }

  private turingMachine: TuringBase | undefined;
  private turingMachineName: string = '';

  public setup = (formData: FormData) => {
    this.formData = formData;
  };

  public getStrategy = (turingMachine: TuringBase) => {
    this.turingMachine = turingMachine;
  };

  public setFormData = (formData: FormData) => {
    this.formData = formData;
  };

  public getTotalTape() {
    if (this.turingMachine) {
      return this.turingMachine.getTotalTape();
    }
    return 0;
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

  private formData: FormData;

  public run() {
    if (this.turingMachine) {
      this.turingMachine.setup(this.formData.data);
      this.turingMachine.run();
      console.log('inputSymbols', this.turingMachine.getInputSymbols());
      const turingMachineResult: TuringMachinesResult = {
        transitions: this.turingMachine.getTransitions(),
        inputSymbols: this.turingMachine.getInputSymbols(),
        TapeResult: this.turingMachine.getResult(),
        lastHead: this.turingMachine.getLastHead(),
      };
      return turingMachineResult;
    }
  }
}

const convertOperationFormData = (operation: string) => {
  return operation.replace(/ /g, '').replace('-', '');
};

const getStrategy = (strategyName: string): undefined | Strategy => {
  switch (strategyName) {
    case 'AdditionMultiTape':
      return new AdditionMultiTape();
    // case 'AdditionSingleTrack':
    // return new AdditionSingleTrack(1);
    //   break;
    // case 'SubtractionMultiTape':
    //   this.turingMachine = new SubtractionMultiTape();
    //   break;
    // case 'SubtractionSingleTrack':
    //   this.turingMachine = new SubtractionSingleTrack();
    //   break;
    // case 'MultiplicationMultiTape':
    //   this.turingMachine = new MultiplicationMultiTape();
    //   break;
    // case 'MultiplicationSingleTrack':
    //   this.turingMachine = new MultiplicationSingleTrack();
    //   break;
    // case 'DivisionMultiTape':
    //   this.turingMachine = new DivisionMultiTape();
    //   break;
    // case 'DivisionSingleTrack':
    //   this.turingMachine = new DivisionSingleTrack();
    //   break;
    // case 'FactorialMultiTape':
    //   this.turingMachine = new FactorialMultiTape();
    //   break;
    // case 'FactorialMultiTrack':
    //   this.turingMachine = new FactorialMultiTrack();
    //   break;
    // case 'PowerMultiTape':
    //   this.turingMachine = new PowerMultiTape();
    //   break;
    // case 'PowerMultiTrack':
    //   this.turingMachine = new PowerMultiTrack();
    //   break;
    // case 'BinaryLogarithmMultiTape':
    //   this.turingMachine = new BinaryLogarithmMultiTape();
    //   break;
    // case 'BinaryLogarithmMultiTrack':
    //   this.turingMachine = new BinaryLogarithmMultiTrack();
    //   break;
    // case 'TemperatureConversionMultiTape':
    //   this.turingMachine = new TemperatureConversionMultiTape();
    //   break;
    // case 'TemperatureConversionMultiTrack':
    //   this.turingMachine = new TemperatureConversionMultiTrack();
    //   break;
    default:
      break;
  }
};
