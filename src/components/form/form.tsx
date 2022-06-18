import { Dropdown } from './dropdown';
import { Input } from './input';
import { FormData } from '../type';
import { Legend } from './legend';

export const Form = (props: {
  operation: FormData;
  setOperation: React.Dispatch<React.SetStateAction<FormData>>;
  isTransitionShow: boolean;
  setIsTransitionShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { operation, setOperation, isTransitionShow, setIsTransitionShow } =
    props;

  return (
    <div className="my-6">
      <div className="flex place-items-center gap-x-4">
        <div className="select text-2xl font-semibold text-primary-indigo">
          Operation:
        </div>
        <Dropdown operation={operation} setOperation={setOperation} />
      </div>
      <div className="input-handle">
        <Input operation={operation} setOperation={setOperation} />
      </div>
      <div className="slider">
        <label className="text-xl font-medium text-primary-indigo ">
          Simulation Duration
        </label>
        <div className="w-full flex place-content-between place-items-center">
          <input
            type="range"
            className="w-4/5 h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
            min="0"
            max="4000"
            step="200"
            value={operation.duration}
            onChange={(e) =>
              setOperation({
                ...operation,
                duration: parseInt(e.target.value, 10),
              })
            }
          />
          <div className=" w-24 h-10 text-base  border text-opacity-70 text-primary-indigo font-medium flex place-content-center place-items-center border-gray-300 rounded-md bg-gray-100">
            {operation.duration === -100 ? 0 : operation.duration}ms
          </div>
        </div>
      </div>
      <div className="buttons mt-4 flex place-content-between gap-x-4">
        <div className="wrapper flex gap-x-4">
          <button
            className="text-primary-indigo font-medium text-sm w-24  bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200"
            onClick={() =>
              setOperation({
                data: operation?.data,
                operation: operation?.operation,
                actionType: 'Validate',
                duration: operation.duration,
              })
            }
          >
            Validate
          </button>
          <button
            className="text-primary-indigo font-medium text-sm w-24 bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200"
            onClick={() =>
              setOperation({
                data: operation?.data,
                operation: operation?.operation,
                actionType: 'Debug',
                duration: operation.duration,
              })
            }
          >
            Debug
          </button>
        </div>
        <button
          className="text-primary-indigo font-medium text-sm w-24 bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200"
          onClick={() =>
            setOperation({
              data: operation?.data,
              operation: operation?.operation,
              actionType: 'Simulate',
              duration: operation.duration,
            })
          }
        >
          Simulate
        </button>
      </div>
      <div className="buttons mt-2 flex place-content-between gap-x-4">
        <button
          className="text-primary-indigo font-medium text-sm w-52 bg-slate-100 rounded-md px-4 h-9 mt-2 hover:bg-slate-200 duration-200"
          onClick={() => {
            setIsTransitionShow(!isTransitionShow);
          }}
        >
          Show Transitions
        </button>
        <Legend />
      </div>
    </div>
  );
};
