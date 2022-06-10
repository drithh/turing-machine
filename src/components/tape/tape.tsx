import React, { useEffect, useState, useRef } from 'react';
import { Square } from './square';
import { motion } from 'framer-motion';

export const Tape = (props: {}) => {
  const [positions, setPositions] = useState([
    -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [head, setHead] = useState(0);
  const [tape, setTape] = useState(0);
  const [goNegative, setGoNegative] = useState(false);
  const minTape = useRef(0);

  useEffect(() => {
    minTape.current = Math.min(minTape.current, tape);
  }, [tape]);

  const setTapeHead = (x: number) => {
    if (head + x < 0) {
      setGoNegative(true);
      if (positions[0] === tape - 2) {
        // console.log('add left tape');
        const position = positions[0] - 1;
        setPositions([position, ...positions]);
        setTape(tape + x);
      } else {
        setTape(tape - 1);
      }
    } else if (head + x > 10) {
      const last = positions.length - 1;
      // console.log(positions[last] - 10, tape + 2);
      if (positions[last] - 10 === tape + 2) {
        // console.log('add right tape');
        const position = positions[last] + 1;
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
    <div className="flex top-20 left-20 relative w-[48rem] h-40 overflow-hidden">
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
              key={position}
              blur={checkBlur(position)}
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
