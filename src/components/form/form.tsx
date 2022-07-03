import { Dropdown } from './dropdown';
import { Input } from './input';
import { Legend } from './legend';
import { useRef, useState } from 'react';

export const Form = (props: {
  isTransitionShow: boolean;
  setIsTransitionShow: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  actionHandler: (action: string, data: any) => void;
  dropdownHandler: (action: string) => void;
}) => {
  const {
    isTransitionShow,
    setIsTransitionShow,
    duration,
    setDuration,
    actionHandler,
    dropdownHandler,
  } = props;

  const debugRef = useRef<HTMLButtonElement>(null);

  const [data, setData] = useState<any>();
  const [operation, setOperation] = useState<string>('Select Operation');

  return (
    <div className="my-6">
      <div className="flex place-items-center gap-x-4">
        <div className="select text-2xl font-semibold text-primary-indigo">
          Operation:
        </div>
        <Dropdown
          operation={operation}
          setOperation={setOperation}
          dropdownHandler={dropdownHandler}
        />
      </div>
      <div className="input-handle">
        <Input data={data} setData={setData} operation={operation} />
      </div>
      <div className="slider">
        <label className="text-xl font-medium text-primary-indigo ">
          Simulation Duration
        </label>
        <div className="w-full flex place-content-between place-items-center">
          <input
            type="range"
            className="w-4/5 h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
            min="200"
            max="4000"
            step="200"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          />
          <div className=" w-24 h-10 text-base  border text-opacity-70 text-primary-indigo font-medium flex place-content-center place-items-center border-gray-300 rounded-md bg-gray-100">
            {duration}ms
          </div>
        </div>
      </div>
      <div className="buttons mt-4 flex place-content-between gap-x-4">
        <div className="wrapper flex gap-x-4">
          <button
            className="text-primary-indigo font-medium text-sm w-32  bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200"
            onClick={() =>
              actionHandler('ShowResult', {
                operation: operation,
                data: data,
              })
            }
          >
            Show Result
          </button>
          <button
            ref={debugRef}
            className="text-primary-indigo font-medium text-sm w-32 bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200"
            onClick={() => {
              actionHandler('Debug', {
                operation: operation,
                data: data,
              });
              //set debug ref disabled
              if (debugRef.current) {
                debugRef.current.disabled = true;
                setTimeout(() => {
                  if (debugRef.current) {
                    debugRef.current.disabled = false;
                  }
                }, Math.max(duration, 800));
              }
            }}
          >
            Debug
          </button>
        </div>
        <button
          className="text-primary-indigo font-medium text-sm w-24 bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200"
          onClick={() =>
            actionHandler('Simulate', {
              operation: operation,
              data: data,
            })
          }
        >
          Simulate
        </button>
      </div>
      <div className="buttons mt-2 flex place-content-between gap-x-4">
        <button
          className="text-primary-indigo font-medium text-sm w-[17rem] bg-slate-100 rounded-md px-4 h-9 mt-2 hover:bg-slate-200 duration-200"
          onClick={() => {
            setIsTransitionShow(!isTransitionShow);
          }}
        >
          Show Transitions
        </button>
        <Legend operation={operation} />
      </div>
    </div>
  );
};
