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
import { motion } from 'framer-motion';

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
  const lastSelected = useRef('');
  const [isTransitionShow, setIsTransitionShow] = useState<boolean>(false);
  const [lastTransitions, setLastTransitons] = useState<Transition[]>([]);

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

      if (
        !(
          (formData.actionType === 'Simulate' &&
            lastSelected.current === 'Debug') ||
          (formData.actionType === 'Debug' &&
            lastSelected.current === 'Simulate')
        ) ||
        isRunning.current === false
      ) {
        setReset(true);
      }
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
          setLastTransitons(turingMachines.getTransitions());
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
        lastSelected.current = 'Validate';
        setFormData({
          ...formData,
          actionType: '',
        });
        isRunning.current = false;
        setActiveTransition(undefined);
        setIndex(0);
        setAssignedHead(turingMachinesResult.lastHead);
        setInputString(turingMachinesResult.tapeResult);
        setTuringMachinesResult(undefined);
      }

      if (
        (formData.actionType === 'Simulate' ||
          formData.actionType === 'Debug') &&
        lastSelected.current === 'Validate' &&
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
          lastSelected.current = 'Simulate';
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
  }, [turingMachinesResult, duration, index, formData.actionType]);

  useEffect(() => {
    if (turingMachinesResult && formData.actionType !== '') {
      if (formData.actionType === 'Debug') {
        lastSelected.current = 'Debug';
        setFormData({
          ...formData,
          actionType: '',
        });
        if (isRunning.current === false) {
          isRunning.current = true;
          setIndex(0);
        } else {
          if (turingMachinesResult.transitions.length > index) {
            setAssignedHead([]);

            isRunning.current = true;
            setActiveTransition(turingMachinesResult.transitions[index]);
            setIndex(index + 1);
          } else if (
            turingMachinesResult &&
            turingMachinesResult.transitions.length === index
          ) {
            isRunning.current = false;
            setActiveTransition(undefined);
            setIndex(0);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.actionType, turingMachinesResult]);

  return (
    <div className="App  w-full max-w-[1366px] mx-auto mt-[10vh] flex flex-col gap-y-8 xl:px-0 px-12">
      <div className="flex xl:flex-row flex-col place-items-center gap-x-8 place-content-between">
        <div className="w-full xl:w-2/5">
          <div className="title font-sans text-[56px] text-primary-indigo font-bold pb-2 border-opacity-50 border-b border-b-primary-meadow ">
            Turing Machine
          </div>
          <Form
            operation={formData}
            setOperation={setFormData}
            isTransitionShow={isTransitionShow}
            setIsTransitionShow={setIsTransitionShow}
          />
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
      <div className="flex place-content-between mb-20">
        {isTransitionShow && (
          <motion.div className="min-w-[20rem] h-[37.5rem] overflow-y-auto scroll-m-0 border-x px-4 border-primary-meadow border-opacity-50 flex flex-col scrollbar-hide">
            <div className="text-center py-2 font-sans border-y border-primary-meadow px-4 font-medium border-opacity-30">
              Transitions
            </div>
            {lastTransitions.map((transition, i) => {
              return (
                <div
                  key={i}
                  className={
                    'px-4 border-b border-primary-meadow border-opacity-30 w-full py-2 '
                  }
                >
                  <span>
                    δ (q<sub>{transition?.from}</sub>, {transition?.head})
                  </span>
                  <span>
                    {'  '} ={'  '}(q<sub>{transition?.to}</sub>,{' '}
                    {transition?.headReplace}, {transition?.tapeDirection})
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
        <CreateGraph
          diagramFileName={`${formData.operation
            .replace(/ /g, '')
            .toLowerCase()}.json`}
          // diagramFileName="multiplication-singletrack.json"
          activeTransition={activeTransition}
          duration={duration}
        />
      </div>
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
