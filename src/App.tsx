import { CreateGraph } from './components/graph/graph';
import './App.css';
import { Transition } from './components/type';
import { Tape } from './components/tape/tape';
import { Form } from './components/form/form';
import { FormData } from './components/type';
import { useEffect, useRef, useState } from 'react';
import {
  TuringMachines,
  TuringMachinesResult,
} from './components/turing-machine/turing-machine';

function App() {
  const [formData, setFormData] = useState<FormData>({
    operation: 'Select Operation',
    data: undefined,
    actionType: undefined,
    duration: 2000,
  });

  const isRunning = useRef(false);

  const [inputString, setInputString] = useState<string[][]>([]);

  const [duration, setDuration] = useState<number>(1000);
  const [turingMachinesResult, setTuringMachinesResult] =
    useState<TuringMachinesResult>();
  const [index, setIndex] = useState<number>(0);

  const [turingMachines, setTuringMachines] = useState<TuringMachines>();
  const [reset, setReset] = useState<boolean>(false);
  const [activeTransition, setActiveTransition] = useState<Transition>();
  const [assignedHead, setAssignedHead] = useState<number[]>();

  useEffect(() => {
    setTimeout(() => {
      setReset(false);
    }, 200);
  }, [reset]);

  useEffect(() => {
    if (
      formData.actionType !== '' &&
      formData.actionType !== undefined &&
      formData.actionType !== turingMachines?.getActionType()
    ) {
      setTuringMachines(new TuringMachines(formData));

      setReset(true);
    }
    if (formData.operation && isRunning.current === false) {
      if (turingMachines?.getOperation() !== formData.operation) {
        setTuringMachines(new TuringMachines(formData));
      } else {
        turingMachines.setFormData(formData);
      }
      if (turingMachines) {
        if (formData.actionType && validateForm(formData)) {
          setTuringMachinesResult(turingMachines.run());
        }
      }
    }

    setDuration(formData.duration === undefined ? 2000 : formData.duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    if (turingMachinesResult) {
      if (
        turingMachinesResult.inputSymbols &&
        inputString[0] !== turingMachinesResult.inputSymbols
      ) {
        const inputString = [turingMachinesResult.inputSymbols];
        setInputString(inputString);
      }

      if (formData.actionType === 'Validate') {
        setFormData({
          ...formData,
          actionType: '',
        });
        isRunning.current = false;
        setActiveTransition(undefined);
        setIndex(0);
        setAssignedHead(turingMachinesResult.lastHead);
        setInputString(turingMachinesResult.tapeResult);
      }

      if (
        formData.actionType === 'Simulate' &&
        index === 0 &&
        isRunning.current === false
      ) {
        setAssignedHead([0, 0, 0]);
        setReset(true);
      }

      const interval = setInterval(() => {
        if (
          formData.actionType === 'Simulate' &&
          turingMachinesResult.transitions.length > index
        ) {
          setAssignedHead([]);

          isRunning.current = true;
          setActiveTransition(turingMachinesResult.transitions[index]);
          setIndex(index + 1);
        } else if (
          turingMachinesResult &&
          turingMachinesResult.transitions.length === index
        ) {
          setFormData({
            ...formData,
            actionType: '',
          });
          isRunning.current = false;
          setActiveTransition(undefined);
          setIndex(0);
        }
      }, duration);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turingMachinesResult, duration, index]);

  return (
    <div className="App  w-full max-w-[1366px] mx-auto mt-[10vh] flex flex-col gap-y-8">
      <div className="flex xl:flex-row flex-col place-items-center gap-x-8 place-content-center">
        <div className="w-2/5">
          <div className="title font-sans text-[56px] text-primary-indigo font-bold pb-2 border-opacity-50 border-b border-b-primary-meadow ">
            Turing Machine
          </div>
          <Form operation={formData} setOperation={setFormData} />
        </div>
        <div className="relative flex flex-col place-items-center gap-y-6 mt-20">
          {Array.from(Array(turingMachines?.getTotalTape()), (e, i) => {
            return (
              <Tape
                activeTransition={activeTransition}
                duration={duration}
                inputString={inputString[i] ? inputString[i] : undefined}
                index={i}
                key={i}
                reset={reset}
                assignedHead={assignedHead ? assignedHead[i] : undefined}
              />
            );
          })}
        </div>
      </div>
      <CreateGraph
        diagramFileName={`${formData.operation
          .replace(/ /g, '')
          .toLowerCase()}.json`}
        activeTransition={activeTransition}
        duration={duration}
      />
    </div>
  );
}

const validateForm = (formData: FormData) => {
  if (formData.operation === 'Select Operation') {
    formData.actionType = undefined;
    alert('Please select an operation');
    return false;
  } else if (formData.data === undefined) {
    formData.actionType = undefined;
    alert('Please enter input value');
    return false;
  } else if (
    (formData.data.input1 &&
      (formData.data.input2 === undefined || isNaN(formData.data.input2))) ||
    (formData.data.input2 &&
      (formData.data.input1 === undefined || isNaN(formData.data.input1))) ||
    (isNaN(formData.data.input1) && isNaN(formData.data.input2))
  ) {
    formData.actionType = undefined;
    alert('Please enter input value');
    return false;
  } else if (
    formData.actionType === 'Simulate' &&
    formData.duration === undefined
  ) {
    formData.actionType = undefined;
    alert('Please enter duration');
    return false;
  }

  return true;
};

export default App;
