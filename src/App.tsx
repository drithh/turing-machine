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
  createTuringMachine,
} from './components/turing-machine/turing-machine';
import { motion } from 'framer-motion';

function App() {
  const [formData, setFormData] = useState<FormData>({
    operation: 'Select Operation',
    data: '',
  });

  const isRunning = useRef(false);
  const [inputString, setInputString] = useState<string[][]>([]);

  const [duration, setDuration] = useState<number>(2000);
  const [turingMachinesResult, setTuringMachinesResult] =
    useState<TuringMachinesResult>();
  const index = useRef(0);
  const currentAction = useRef('');
  const turingMachines = useRef<TuringMachines>();
  // const [turingMachines, setTuringMachines] = useState<TuringMachines>();
  const [reset, setReset] = useState<boolean>(false);
  const [activeTransition, setActiveTransition] = useState<Transition>();
  const [assignedHead, setAssignedHead] = useState<number[]>();
  const [isTransitionShow, setIsTransitionShow] = useState<boolean>(false);
  const [lastTransitions, setLastTransitons] = useState<Transition[]>([]);
  const simulateDebug = useRef(false);

  const dropdownHandler = (operation: string) => {
    setFormData({ ...formData, operation });
    resetTuringMachine(operation);
  };

  const actionHandler = (action: string, data: FormData) => {
    if (formData.operation !== data.operation || formData.data !== data.data) {
      setFormData(data);
      console.log('Reset');
      restart(action, data);
    } else {
      if (!isRunning.current) {
        console.log('Reset 2');
        setFormData(data);
        restart(action, data);
      } else {
        console.log('No Reset');
      }
      if (action === 'Debug') {
        if (currentAction.current === 'Simulate') {
          simulateDebug.current = true;
        } else {
          debug();
        }
      } else if (action === 'ShowResult') {
        showResult();
      }
    }
    currentAction.current = action;
  };

  const resetTuringMachine = async (operation: string) => {
    setReset(true);
    index.current = 0;
    isRunning.current = false;
    setActiveTransition(undefined);
    setTuringMachinesResult(undefined);
    setAssignedHead([0, 0, 0]);
    setInputString([[], [], []]);
    turingMachines.current = await createTuringMachine(operation);
  };

  const restart = async (action: string, data: FormData) => {
    await resetTuringMachine(data.operation);
    if (turingMachines.current) {
      turingMachines.current.setup(data);
      setTuringMachinesResult(turingMachines.current.run());

      setLastTransitons(turingMachines.current.getTransitions());
    }
    console.log('Restarted');
  };

  useEffect(() => {
    setTimeout(() => {
      setReset(false);
    }, 200);
  }, [reset]);

  useEffect(() => {
    if (turingMachinesResult) {
      if (!isRunning.current) {
        const inputString = [turingMachinesResult.inputSymbols];
        setInputString(inputString);
      }
    }
  }, [turingMachinesResult]);

  // Simulate
  useEffect(() => {
    if (turingMachinesResult) {
      const interval = setInterval(() => {
        if (
          turingMachinesResult &&
          (currentAction.current === 'Simulate' || simulateDebug.current)
        ) {
          simulateDebug.current = false;
          if (turingMachinesResult.transitions.length > index.current) {
            setAssignedHead([]);
            isRunning.current = true;
            setActiveTransition(
              turingMachinesResult.transitions[index.current]
            );
            index.current++;
          } else if (
            turingMachinesResult &&
            turingMachinesResult.transitions.length === index.current
          ) {
            isRunning.current = false;
            setTuringMachinesResult(undefined);
            setActiveTransition(undefined);
            index.current = 0;
          }
        }
      }, duration + 10);
      return () => clearInterval(interval);
    }
  }, [duration, turingMachinesResult]);

  const debug = () => {
    if (turingMachinesResult) {
      if (turingMachinesResult.transitions.length > index.current) {
        setAssignedHead([]);
        isRunning.current = true;
        setActiveTransition(turingMachinesResult.transitions[index.current]);
        index.current++;
      } else if (
        turingMachinesResult &&
        turingMachinesResult.transitions.length === index.current
      ) {
        isRunning.current = false;
        setTuringMachinesResult(undefined);
        setActiveTransition(undefined);
        index.current = 0;
      }
    }
  };

  useEffect(() => {
    if (turingMachinesResult && currentAction.current === 'ShowResult') {
      setAssignedHead(turingMachinesResult.lastHead);
      setInputString(turingMachinesResult.TapeResult);
      isRunning.current = false;
      setTuringMachinesResult(undefined);
      setActiveTransition(undefined);
      index.current = 0;
    }
  }, [turingMachinesResult]);

  const showResult = () => {
    console.log('Show Result');
    if (turingMachinesResult) {
      setAssignedHead(turingMachinesResult.lastHead);
      setInputString(turingMachinesResult.TapeResult);
      currentAction.current = '';
      isRunning.current = false;
      setTuringMachinesResult(undefined);
      setActiveTransition(undefined);
      index.current = 0;
    }
  };

  return (
    <div className="App  w-full max-w-[1366px] mx-auto mt-[10vh] flex flex-col gap-y-8 xl:px-0 px-12">
      <div className="flex xl:flex-row flex-col place-items-center gap-x-8 place-content-between">
        <div className="w-full xl:w-2/5">
          <div className="title font-sans text-[56px] text-primary-indigo font-bold pb-2 border-opacity-50 border-b border-b-primary-meadow ">
            Turing Machine
          </div>
          <Form
            isTransitionShow={isTransitionShow}
            setIsTransitionShow={setIsTransitionShow}
            duration={duration}
            setDuration={setDuration}
            actionHandler={actionHandler}
            dropdownHandler={dropdownHandler}
          />
        </div>
        <div className="relative flex flex-col place-items-center gap-y-6 mt-20">
          {Array.from(Array(turingMachines.current?.getTotalTape()), (e, i) => {
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
      <div className="flex place-content-between mb-20 relative min-h-[30rem]">
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
          activeTransition={activeTransition}
          duration={duration}
        />
      </div>
    </div>
  );
}

const validateForm = (formData: FormData, formAction: string) => {
  if (formData.operation === 'Select Operation') {
    alert('Please select an operation');
    return false;
  } else if (formData.data === undefined) {
    alert('Please enter input value');
    return false;
  } else if (!formData.data) {
    alert('Please enter input value');
    return false;
  }
  return true;
};

export default App;
