import { Fragment, useEffect, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';

export const Legend = (props: { operation: string }) => {
  const { operation } = props;
  const defaultOperation = [
    '0 : 1 Negative Number ex:000 => -3',
    '1 : 1 Positive Number ex:111 => 3',
    'C : Delimiter',
    'E : Escape Character',
  ];
  const operations = useRef(defaultOperation);

  useEffect(() => {
    operations.current = defaultOperation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="pt-2">
        <Menu.Button className=" text-primary-indigo font-medium text-sm w-24 bg-slate-100 rounded-md px-4 py-2 hover:bg-slate-200 duration-200 focus:outline-none  focus:ring-offset-gray-100 ">
          Symbols
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-max z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {operations.current.map((item) => {
              return (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <div
                      className={
                        'block w-full text-left px-4 py-2 text-sm text-gray-700'
                      }
                    >
                      {item}
                    </div>
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
