import { useEffect, useState } from 'react';

export const Input = (props: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className="my-6">
      <div className="wrappper w-full">
        <label className="text-lg font-medium text-primary-indigo">
          Input:
        </label>
        <input
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 focus:outline-none block w-full h-10 text-base px-4 border text-opacity-70 text-primary-indigo font-medium pb-1 border-gray-300 rounded-md"
          type="text"
          value={props.data}
          onChange={(e) => props.setData(e.target.value)}
          placeholder="Enter input"
        />
      </div>
    </div>
  );
};
