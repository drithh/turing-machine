import { FormData, Transition, Symbol } from '../type';
import { AdditionMultiTape } from './addition-multitape';
import { AdditionSingleTrack } from './addition-singletrack';
import { BinaryLogarithmMultiTape } from './binarylogarithm-multitape';
import { BinaryLogarithmMultiTrack } from './binarylogarithm-multitrack';
import { DivisionMultiTape } from './division-multitape';
import { DivisionSingleTrack } from './division-singletrack';
import { FactorialMultiTape } from './factorial-multitape';
import { FactorialMultiTrack } from './factorial-multitrack';
import { MultiplicationMultiTape } from './multiplication-multitape';
import { MultiplicationSingleTrack } from './multiplication-singletrack';
import { PowerMultiTape } from './power-multitape';
import { PowerMultiTrack } from './power-multitrack';
import { SubtractionMultiTape } from './subtraction-multitape';
import { SubtractionSingleTrack } from './subtraction-singletrack';
import { TemperatureConversionMultiTape } from './temperatureconversion-multitape';
import { TemperatureConversionMultiTrack } from './temperatureconversion-multitrack';

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

    switch (turingMachineName) {
      case 'AdditionMultiTape':
        this.turingMachine = new AdditionMultiTape();
        break;
      case 'AdditionSingleTrack':
        this.turingMachine = new AdditionSingleTrack();
        break;
      case 'SubtractionMultiTape':
        this.turingMachine = new SubtractionMultiTape();
        break;
      case 'SubtractionSingleTrack':
        this.turingMachine = new SubtractionSingleTrack();
        break;
      case 'MultiplicationMultiTape':
        this.turingMachine = new MultiplicationMultiTape();
        break;
      case 'MultiplicationSingleTrack':
        this.turingMachine = new MultiplicationSingleTrack();
        break;
      case 'DivisionMultiTape':
        this.turingMachine = new DivisionMultiTape();
        break;
      case 'DivisionSingleTrack':
        this.turingMachine = new DivisionSingleTrack();
        break;
      case 'FactorialMultiTape':
        this.turingMachine = new FactorialMultiTape();
        break;
      case 'FactorialMultiTrack':
        this.turingMachine = new FactorialMultiTrack();
        break;
      case 'PowerMultiTape':
        this.turingMachine = new PowerMultiTape();
        break;
      case 'PowerMultiTrack':
        this.turingMachine = new PowerMultiTrack();
        break;
      case 'BinaryLogarithmMultiTape':
        this.turingMachine = new BinaryLogarithmMultiTape();
        break;
      case 'BinaryLogarithmMultiTrack':
        this.turingMachine = new BinaryLogarithmMultiTrack();
        break;
      case 'TemperatureConversionMultiTape':
        this.turingMachine = new TemperatureConversionMultiTape();
        break;
      case 'TemperatureConversionMultiTrack':
        this.turingMachine = new TemperatureConversionMultiTrack();
        break;
      default:
        break;
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
    | FactorialMultiTape
    | FactorialMultiTrack
    | PowerMultiTape
    | PowerMultiTrack
    | BinaryLogarithmMultiTape
    | BinaryLogarithmMultiTrack
    | TemperatureConversionMultiTape
    | TemperatureConversionMultiTrack
    | undefined;

  public setFormData = (formData: FormData) => {
    this.formData = formData;
  };

  public getTotalTape() {
    switch (this.turingMachineName) {
      case 'AdditionMultiTape':
        return AdditionMultiTape.totalTape;
      case 'AdditionSingleTrack':
        return AdditionSingleTrack.totalTape;
      case 'SubtractionMultiTape':
        return SubtractionMultiTape.totalTape;
      case 'SubtractionSingleTrack':
        return SubtractionSingleTrack.totalTape;
      case 'MultiplicationMultiTape':
        return MultiplicationMultiTape.totalTape;
      case 'MultiplicationSingleTrack':
        return MultiplicationSingleTrack.totalTape;
      case 'DivisionMultiTape':
        return DivisionMultiTape.totalTape;
      case 'DivisionSingleTrack':
        return DivisionSingleTrack.totalTape;
      case 'FactorialMultiTape':
        return FactorialMultiTape.totalTape;
      case 'FactorialMultiTrack':
        return FactorialMultiTrack.totalTape;
      case 'PowerMultiTape':
        return PowerMultiTape.totalTape;
      case 'PowerMultiTrack':
        return PowerMultiTrack.totalTape;
      case 'BinaryLogarithmMultiTape':
        return BinaryLogarithmMultiTape.totalTape;
      case 'BinaryLogarithmMultiTrack':
        return BinaryLogarithmMultiTrack.totalTape;
      case 'TemperatureConversionMultiTape':
        return TemperatureConversionMultiTape.totalTape;
      case 'TemperatureConversionMultiTrack':
        return TemperatureConversionMultiTrack.totalTape;
      default:
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
      // if (this.formData.data.input1) {
      //   const data: TwoInput = this.formData.data;
      //   this.turingMachine.setup(data);
      // } else if (this.formData.data.temperature) {
      // } else {
      //   this.turingMachine.setup(data);

      // }
      // this.turingMachine.setup(this.formData.data);

      switch (this.turingMachineName) {
        case 'AdditionMultiTape':
        case 'AdditionSingleTrack':
        case 'SubtractionMultiTape':
        case 'MultiplicationMultiTape':
        case 'SubtractionSingleTrack':
        case 'MultiplicationSingleTrack':
        case 'DivisionMultiTape':
        case 'DivisionSingleTrack':
        case 'PowerMultiTape':
        case 'PowerMultiTrack':
          this.turingMachine.setup(this.formData.data);
          break;
        case 'FactorialMultiTape':
        case 'FactorialMultiTrack':
        case 'BinaryLogarithmMultiTape':
        case 'BinaryLogarithmMultiTrack':
          this.turingMachine.setup(this.formData.data);
          break;
        case 'TemperatureConversionMultiTape':
        case 'TemperatureConversionMultiTrack':
          this.turingMachine.setup(this.formData.data);
          break;
        default:
          break;
      }

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
