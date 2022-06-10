import { CreateGraph } from './components/graph/graph';
import './App.css';
import { Transition } from './components/type';

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

  const addStep = () => {
    steps.push({
      from: 0,
      to: 0,
      head: '0B',
      headReplace: 'CB',
      tapeDirection: 'RL',
    });
  };

  return (
    <div
      className="App"
      onClick={() => {
        addStep();
      }}
    >
      <CreateGraph
        diagramFileName="addition.json"
        steps={steps}
        duration={2000}
      />
    </div>
  );
}

export default App;
