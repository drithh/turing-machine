import { useEffect, useState } from 'react';
import { FormData, TwoInput, Temperature } from '../type';

export const Input = (props: {
  operation: FormData | undefined;
  setOperation: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
  const { operation, setOperation } = props;
  const [inputCase, setInputCase] = useState(0);
  useEffect(() => {
    setInputCase(getInputCase(operation?.operation ? operation.operation : ''));
  }, [operation]);
  return (
    <div className="my-6">
      {inputCase === 1 && (
        <div className="wrappper w-full">
          <label className="text-lg font-medium text-primary-indigo">
            Input:
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 focus:outline-none block w-full h-10 text-base px-4 border text-opacity-70 text-primary-indigo font-medium pb-1 border-gray-300 rounded-md"
            onChange={(e) => {
              if (operation) {
                setOperation({
                  ...operation,
                  data: parseInt(e.target.value, 10),
                });
              }
            }}
          />
        </div>
      )}
      {inputCase === 2 && (
        <div className="flex place-items-center place-content-between gap-x-3">
          <div className="wrappper w-60">
            <label className="text-lg font-medium text-primary-indigo">
              First Input:
            </label>
            <input
              type="number"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 focus:outline-none block w-full h-10 text-base px-4 border text-opacity-70 text-primary-indigo font-medium pb-1 border-gray-300 rounded-md"
              onChange={(e) => {
                if (operation) {
                  setOperation({
                    ...operation,
                    data: {
                      input1: parseInt(e.target.value, 10),
                      input2: operation.data?.input2,
                    } as TwoInput,
                  });
                }
              }}
            />
          </div>

          <div className="wrappper w-60">
            <label className="text-lg font-medium text-primary-indigo">
              Second Input:
            </label>
            <input
              type="number"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 focus:outline-none block w-full h-10 text-base px-4 border text-opacity-70 text-primary-indigo font-medium pb-1 border-gray-300 rounded-md"
              onChange={(e) => {
                if (operation) {
                  setOperation({
                    ...operation,
                    data: {
                      input1: operation.data?.input1,
                      input2: parseInt(e.target.value, 10),
                    } as TwoInput,
                  });
                }
              }}
            />
          </div>
        </div>
      )}
      {inputCase === 3 && (
        <div className="wrappper w-full">
          <label className="text-lg font-medium text-primary-indigo">
            Input
          </label>
          <div className="mt-1 relative">
            <input
              type="number"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 focus:outline-none block w-full h-10 text-base px-4 border text-opacity-70 text-primary-indigo font-medium pb-1 border-gray-300 rounded-md appearance-none"
              onChange={(e) => {
                if (operation) {
                  let from = 'C';
                  let to = 'C';
                  setOperation({
                    ...operation,
                    data: {
                      temperature: parseInt(e.target.value, 10),
                      from: operation.data?.from ? operation.data.from : from,
                      to: operation.data?.to ? operation.data.to : to,
                    } as Temperature,
                  });
                }
              }}
            />
            <div className="conversion-wrapper absolute pr-3 inset-y-0 right-0 flex gap-x-4">
              <div className="   flex items-center  ">
                <select
                  name="temperature"
                  className=" h-full focus:outline-none py-0 !shadow-none pl-2 pr-4 pb-1 border-transparent bg-transparent text-primary-indigo text-base  font-medium "
                  onChange={(e) => {
                    if (operation) {
                      setOperation({
                        ...operation,
                        data: {
                          temperature: operation.data?.temperature,
                          from: e.target.value,
                          to: operation.data?.to,
                        } as Temperature,
                      });
                    }
                  }}
                >
                  <option>C</option>
                  <option>K</option>
                  <option>F</option>
                </select>
              </div>
              <div className="pb-[2px] flex place-items-center text-primary-indigo text-base font-medium">
                to
              </div>
              <div className="  flex items-center  ">
                <select
                  name="temperature"
                  className=" h-full focus:outline-none py-0 !shadow-none pl-2 pr-4 pb-1 border-transparent bg-transparent text-primary-indigo text-base  font-medium "
                  onChange={(e) => {
                    if (operation) {
                      setOperation({
                        ...operation,
                        data: {
                          temperature: operation.data?.temperature,
                          from: operation.data?.from,
                          to: e.target.value,
                        } as Temperature,
                      });
                    }
                  }}
                >
                  <option>C</option>
                  <option>K</option>
                  <option>F</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {inputCase === 0 && (
        <div className="wrappper w-full">
          <label className="text-lg font-medium text-primary-indigo">
            Input:
          </label>
          <input
            type="number"
            placeholder="select operation first"
            disabled
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 focus:outline-none block w-full h-10 text-base px-4 border text-opacity-70 text-primary-indigo font-medium pb-1 border-gray-300 rounded-md"
          />
        </div>
      )}
    </div>
  );
};

const getInputCase = (operation: string) => {
  if (
    operation === 'Addition - SingleTrack' ||
    operation === 'Addition - MultiTape' ||
    operation === 'Subtraction' ||
    operation === 'Multiplication' ||
    operation === 'Division' ||
    operation === 'Power'
  ) {
    return 2;
  } else if (operation === 'Factorial' || operation === 'Binary Logarithm') {
    return 1;
  } else if (operation === 'Temperature Conversion') {
    return 3;
  } else {
    return 0;
  }
};
