import React, { useEffect, useState, useRef } from 'react';
import { Square } from './square';
import { motion } from 'framer-motion';

type TapeData = {
  id: number;
  value?: string;
};

export const Tape = (props: {}) => {
  const [positions, setPositions] = useState<TapeData[]>([
    {
      id: -2,
    },
    {
      id: -1,
    },
    {
      id: 0,
      value: '0',
    },
    {
      id: 1,
      value: '1',
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
    {
      id: 12,
    },
  ]);

  const [head, setHead] = useState(0);
  const [tape, setTape] = useState(0);
  const minTape = useRef(0);

  useEffect(() => {
    minTape.current = Math.min(minTape.current, tape);
  }, [tape]);

  const setTapeHead = (x: number) => {
    if (head + x < 0) {
      if (positions[0].id === tape - 2) {
        // console.log('add left tape');
        const position = { id: positions[0].id - 1 } as TapeData;
        setPositions([position, ...positions]);
        setTape(tape + x);
      } else {
        setTape(tape - 1);
      }
    } else if (head + x > 10) {
      const last = positions.length - 1;
      // console.log(positions[last] - 10, tape + 2);
      if (positions[last].id - 10 === tape + 2) {
        // console.log('add right tape');
        const position = { id: positions[last].id + 1 } as TapeData;
        setPositions([...positions, position]);
        setTape(tape + x);
      } else {
        setTape(tape + 1);
      }
    } else {
      setHead(head + x);
    }
  };

  const checkBlur = (position: number) => {
    if (tape - position === 1) {
      return 'left';
    } else if (tape - position === -11) {
      return 'right';
    }
    return '';
  };

  const getLastTranslate = () => {
    if (tape < minTape.current) {
      return tape * 64;
    } else {
      return minTape.current * 64;
    }
  };

  return (
    <div className="flex relative w-[48rem] h-40 overflow-hidden">
      <motion.div
        className="tape absolute top-0  flex"
        style={{
          left: `${-96 + getLastTranslate()}px`,
        }}
        animate={{
          x: tape * -64,
        }}
      >
        {positions.map((position) => {
          return (
            <Square
              key={position.id}
              blur={checkBlur(position.id)}
              position={position}
            />
          );
        })}
      </motion.div>
      <motion.div
        animate={{
          x: head * 64,
        }}
        className="head w-16 absolute h-[5px] top-[4.5rem] left-[31px] bg-primary-orange"
      ></motion.div>
      <div className="flex place-content-between flex-row absolute bottom-0">
        <div
          onClick={() => {
            setTapeHead(-1);
          }}
          className="w-8 h-8 bg-black"
        ></div>
        <div
          onClick={() => {
            setTapeHead(1);
          }}
          className="w-8 h-8  bg-red-500 right-16"
        ></div>
      </div>
    </div>
  );
};
