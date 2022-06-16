import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FormData } from '../type';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const Dropdown = (props: {
  operation: FormData | undefined;
  setOperation: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
  const { setOperation, operation } = props;

  const operations: string[] = [
    'Addition - SingleTrack',
    'Addition - MultiTape',
    'Subtraction - SingleTrack',
    'Subtraction - MultiTape',
    'Multiplication',
    'Division',
    'Factorial',
    'Binary Logarithm',
    'Power',
    'Temperature Conversion',
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="pt-2">
        <Menu.Button className=" inline-flex place-content-between place-items-center min-w-[14rem] w-fit rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg font-medium text-primary-indigo hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {operation?.operation}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {operations.map((item) => {
              return (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setOperation({
                          actionType: operation?.actionType,
                          data: operation?.data,
                          operation: item,
                        });
                      }}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      {item}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
