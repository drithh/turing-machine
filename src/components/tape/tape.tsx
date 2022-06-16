import React, { useEffect, useState, useRef, Component } from 'react';
import { Square } from './square';
import { motion } from 'framer-motion';
import { Transition } from '../type';

type TapeData = {
  id: number;
  value: string;
};

export const Tape = (props: {
  activeTransition: Transition;
  duration: number;
  inputString?: string[];
  index: number;
}) => {
  const { activeTransition, duration, inputString, index } = props;
  const [positions, setPositions] = useState<TapeData[]>(initTape(inputString));

  const [head, setHead] = useState(0);
  const [tape, setTape] = useState(0);
  const minTape = useRef(0);

  let lastPositions: TapeData[] = [];

  useEffect(() => {
    minTape.current = Math.min(minTape.current, tape);
  }, [tape]);

  const setTapeHead = (x: number) => {
    if (head + x < 0) {
      if (positions[0].id === tape - 2) {
        const position = { id: positions[0].id - 1, value: 'B' } as TapeData;
        if (lastPositions) {
          setPositions([position, ...lastPositions]);
          lastPositions = [];
        } else {
          setPositions([position, ...positions]);
        }
        setTape(tape + x);
      } else {
        setTape(tape - 1);
      }
    } else if (head + x > 10) {
      const last = positions.length - 1;
      if (positions[last].id - 9 === tape + 2) {
        const position = { id: positions[last].id + 1, value: 'B' } as TapeData;
        if (lastPositions) {
          setPositions([...lastPositions, position]);
          lastPositions = [];
        } else {
          setPositions([...positions, position]);
        }
        setTape(tape + x);
      } else {
        setTape(tape + 1);
      }
    } else {
      setHead(head + x);
    }
  };

  const setHeadValue = (value: string) => {
    const headPositions = positions.map((position, index) => {
      if (index === head + 2 + tape) {
        return { ...position, value };
      }
      return position;
    });
    setPositions(headPositions);
    lastPositions = headPositions;
  };

  useEffect(() => {
    if (activeTransition) {
      const direction = activeTransition.tapeDirection[index];
      setHeadValue(activeTransition.headReplace[index]);
      setTimeout(() => {
        setTapeHead(direction === 'L' ? -1 : direction === 'R' ? 1 : 0);
      }, duration / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransition]);

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
    <div className="flex relative w-[48rem] h-32 overflow-hidden">
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
    </div>
  );
};

const initTape = (inputString?: string[]): TapeData[] => {
  const arraySize = Math.max(inputString?.length ?? 0, 14);
  return new Array(arraySize).fill(0).map((_, i) => {
    return {
      id: i - 2,
      value: inputString
        ? inputString[i - 2]
          ? inputString[i - 2]
          : 'B'
        : 'B',
    };
  });
};
