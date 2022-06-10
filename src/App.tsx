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
      head: '0B',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
    {
      from: 0,
      to: 0,
      head: '0B',
      headReplace: 'CB',
      tapeDirection: 'RL',
    },
  ];

  return (
    <div className="App">
      <CreateGraph diagramFileName="addition.json" steps={steps} />
    </div>
  );
}

export default App;
