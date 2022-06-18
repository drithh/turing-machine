import { FormData, Transition, Symbol } from "../type";
import { AdditionMultiTape } from "./addition-multi-tape";

export type TuringMachinesResult = {
  transitions: Transition[];
  inputSymbols: string[];
  tapeResult: Symbol[][];
  lastHead: number[];
};

export class TuringMachines {
  constructor(formData: FormData) {
    this.formData = formData;
    if (this.formData.operation !== "Select Operation") {
      this.turingMachineName = convertOperationFormData(formData.operation);
      this.createturingMachine(this.turingMachineName);
    }
  }

  public createturingMachine = (turingMachineName: string) => {
    if (turingMachineName === "AdditionMultiTape") {
      this.turingMachine = new AdditionMultiTape();
    }
  };

  private turingMachineName = "";

  private turingMachine: AdditionMultiTape | undefined;

  public setFormData = (formData: FormData) => {
    this.formData = formData;
  };

  public getTotalTape() {
    if (this.turingMachineName === "AdditionMultiTape") {
      return AdditionMultiTape.totalTape;
    } else {
      return 0;
    }
  }

  public getOperation() {
    return this.formData.operation;
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
      return turingMachineResult;
    }
  }
}

const convertOperationFormData = (operation: string) => {
  return operation.replace(/ /g, "").replace("-", "");
};
