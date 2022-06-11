import { CreateGraph } from './components/graph/graph';
import './App.css';
import { Transition } from './components/type';
import { Tape } from './components/tape/tape';
import { Form } from './components/form/form';
import { FormData } from './components/form/type';
import { useEffect, useState } from 'react';

function App() {
  const steps: Transition[] = [
    {
      from: 0,
      to: 0,
      head: '0B',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 0,
      to: 0,
      head: '1B',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 0,
      to: 1,
      head: 'CB',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 1,
      to: 1,
      head: '01',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 1,
      to: 1,
      head: '11',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 1,
      to: 1,
      head: '00',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 1,
      to: 2,
      head: 'B1',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    operation: 'Select Operation',
    data: undefined,
    actionType: undefined,
  });

  useEffect(() => {
    console.log(formData);
    if (formData.actionType) {
      validateForm(formData);
    }
  }, [formData]);

  return (
    <div className="App  w-full max-w-[1366px] mx-auto mt-[20vh] flex flex-col gap-y-8">
      <div className="flex xl:flex-row flex-col place-items-center gap-x-8">
        <div className="w-2/5">
          <div className="title font-sans text-[56px] text-primary-indigo font-bold pb-2 border-opacity-50 border-b border-b-primary-meadow ">
            Turing Machine
          </div>
          <Form operation={formData} setOperation={setFormData} />
        </div>
        <div className="w-3/5 flex flex-col place-items-center">
          <Tape />
        </div>
      </div>
      <CreateGraph
        diagramFileName="addition.json"
        steps={steps}
        duration={1000}
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
