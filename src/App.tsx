import { CreateGraph } from './components/graph/graph';
import './App.css';
import { Transition } from './components/type';
import { Tape } from './components/tape/tape';
import { Form } from './components/form/form';
import { FormData } from './components/type';
import { useEffect, useState } from 'react';
import {
  TuringMachines,
  TuringMachinesResult,
} from './components/turing-machine/turing-machine';

function App() {
  const [formData, setFormData] = useState<FormData>({
    operation: 'Addition - MultiTape',
    data: undefined,
    actionType: undefined,
  });

  const [duration, setDuration] = useState<number>(1000);
  const [TuringMachinesResult, setTuringMachinesResult] =
    useState<TuringMachinesResult>();
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    // if (formData.actionType) {
    //   if (validateForm(formData)) {
    //     if (formData.operation === 'Addition - MultiTape') {
    //       console.log('Addition - MultiTape');
    //       const additionResult = new AdditionMultiTrack({
    //         input1: 4,
    //         input2: 5,
    //       });
    //       // const additionResult = new AdditionMultiTrack(formData.data);
    //       additionResult.run();
    //       setInputSymbols(additionResult.getInputSymbols());
    //       setTape(additionResult.getTotalTape());
    //       setSteps(additionResult.getTransitions());
    //     }
    //   }
    // }
    const turingMachines = new TuringMachines(formData);
    setTuringMachinesResult(turingMachines.run());
  }, [formData]);

  const [activeTransition, setActiveTransition] = useState<Transition>();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (
    //     TuringMachinesResult &&
    //     TuringMachinesResult.transitions.length > index
    //   ) {
    //     setActiveTransition(TuringMachinesResult.transitions[index]);
    //     setIndex(index + 1);
    //   }
    // }, duration);
    // return () => clearInterval(interval);
  }, [TuringMachinesResult, duration, index]);

  return (
    <div className="App  w-full max-w-[1366px] mx-auto mt-[10vh] flex flex-col gap-y-8">
      <div className="flex xl:flex-row flex-col place-items-center gap-x-8 place-content-center">
        {/* <div className="w-2/5">
          <div className="title font-sans text-[56px] text-primary-indigo font-bold pb-2 border-opacity-50 border-b border-b-primary-meadow ">
            Turing Machine
          </div>
          <Form operation={formData} setOperation={setFormData} />
        </div> */}
        <div className="relative flex flex-col place-items-center gap-y-6 mt-20">
          {TuringMachinesResult?.inputSymbols &&
            Array.from(Array(TuringMachinesResult?.totalTape), (e, i) => {
              return (
                <Tape
                  activeTransition={activeTransition}
                  duration={duration}
                  inputString={
                    i === 0 ? TuringMachinesResult?.inputSymbols : undefined
                  }
                  index={i}
                  key={i}
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
