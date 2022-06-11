import { useState } from 'react';
import { Dropdown } from './dropdown';
import { Input } from './input';

export const Form = (props: { operation: string }) => {
  // const { operation } = props;

  const [operation, setOperation] = useState('Select Operation');

  return (
    <div className="my-6">
      <div className="flex place-items-center gap-x-4">
        <div className="select text-2xl font-semibold text-primary-indigo">
          Operation:
        </div>
        <Dropdown setOperation={setOperation} operation={operation} />
      </div>
      <div className="input-handle">
        <Input operation={operation} />
      </div>
    </div>
  );
};
