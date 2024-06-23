import { FormData, Transition, Symbol } from '../type';
import { Strategy, parseStrategy } from './strategy';
// import { AdditionMultiTape } from './addition-multitape';
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
// import { Strategy } from './strategy';
// import { SubtractionMultiTape } from './subtraction-multitape';
// import { SubtractionSingleTrack } from './subtraction-singletrack';
import { TuringBase } from './turing-base';

export type TuringMachinesResult = {
  transitions: Transition[];
  inputSymbols: string[];
  TapeResult: Symbol[][];
  lastHead: number[];
};

const readStrategy = (strategyName: string): Promise<string> => {
  const filePath = `strategy/${strategyName
    .replace(/ /g, '')
    .toLowerCase()}.txt`;
  return fetch(filePath).then((response) => response.text());
};

export const createTuringMachine = async (operation: string) => {
  if (operation === 'Select Operation') {
    throw new Error('Operation not selected');
  } else {
    const data = await readStrategy(operation);
    const strategy = parseStrategy(data);
    if (strategy) {
      return new TuringMachines(operation, strategy);
    } else {
      throw new Error('Strategy not found');
    }
  }
};

export class TuringMachines {
  constructor(operation: string, strategy: Strategy) {
    // Return a promise that resolves to an instance of TuringMachines
    this.turingMachine = new TuringBase(strategy);
    this.formData = {
      operation: operation,
      data: '',
    };
  }

  private turingMachine: TuringBase | undefined;

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

// const getStrategy = (strategyName: string): undefined | Strategy => {
//   switch (strategyName) {
//     case 'AdditionMultiTape':
//       return new AdditionMultiTape();
//     case 'AdditionSingleTrack':
//       return new AdditionSingleTrack();
//     case 'SubtractionMultiTape':
//       return new SubtractionMultiTape();
//     case 'SubtractionSingleTrack':
//       return new SubtractionSingleTrack();
//     case 'MultiplicationMultiTape':
//       return new MultiplicationMultiTape();
//     case 'MultiplicationSingleTrack':
//       return new MultiplicationSingleTrack();
//     case 'DivisionMultiTape':
//       return new DivisionMultiTape();
//     case 'DivisionSingleTrack':
//       return new DivisionSingleTrack();
//     case 'FactorialMultiTape':
//       return new FactorialMultiTape();
//     case 'FactorialMultiTrack':
//       return new FactorialMultiTrack();
//     case 'PowerMultiTape':
//       return new PowerMultiTape();
//     case 'PowerMultiTrack':
//       return new PowerMultiTrack();
//     case 'BinaryLogarithmMultiTape':
//       return new BinaryLogarithmMultiTape();
//     case 'BinaryLogarithmMultiTrack':
//       return new BinaryLogarithmMultiTrack();

//     default:
//       break;
//   }
// };
