import React, { useEffect, useState, useRef } from 'react';
import { Square } from './square';
import { motion } from 'framer-motion';
import { Transition } from '../type';
import gradientFilter from '../../images/gradient.png';
import * as Scroll from 'react-scroll';
import { useDraggable } from 'react-use-draggable-scroll';

let scroll = Scroll.animateScroll;
type TapeData = {
  id: number;
  value: string;
};

export const Tape = (props: {
  activeTransition: Transition;
  duration: number;
  inputString?: string[];
  index: number;
  reset: boolean;
  assignedHead?: number;
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
  const {
    activeTransition,
    duration,
    inputString,
    index,
    reset,
    assignedHead,
  } = props;
  // if (index === 1) {
  //   console.log(inputString);
  // }
  const [positions, setPositions] = useState<TapeData[]>(initTape(inputString));
  const [head, setHead] = useState(0);
  const [tapeHead, setTapeHead] = useState(0);
  const [leftTapeSide, setLeftTapeSide] = useState(0);
  if (assignedHead !== undefined && assignedHead !== head) {
    setHead(assignedHead);
  }

  if (reset) {
    if (head !== 0 && tapeHead !== 0) {
      setPositions(initTape(inputString));
      setHead(0);
      setTapeHead(0);
      setLeftTapeSide(0);
    }
  }

  const scrollTape = useRef(null);
  useEffect(() => {
    scroll.scrollMore(576, {
      containerId: `container-tabs-${index}`,
      horizontal: true,
      duration: 1,
    });
  }, [index]);

  let lastPositions: TapeData[] = [];

  const moveTapeHead = (x: number) => {
    if (x === -1 && tapeHead === leftTapeSide) {
      scrollMore(false);
      setLeftTapeSide(leftTapeSide + x);
    } else if (x === 1 && tapeHead === 10 + leftTapeSide) {
      const last = positions[positions.length - 1].id;
      if (last <= head + 1) {
        const position = { id: last + 1, value: 'B' } as TapeData;
        if (lastPositions) {
          setPositions([...lastPositions, position]);
        } else {
          setPositions([...positions, position]);
        }
      }
      setLeftTapeSide(leftTapeSide + x);
      scrollMore(true);
    }
    setTapeHead(tapeHead + x);
    setHead(head + x);
    // console.log({
    //   firstPosition: positions[0].id,
    //   nextHead: nextHead,
    //   leftTapeSide: leftTapeSide,
    //   tapeHead: tapeHead,
    // });
  };

  useEffect(() => {
    setPositions(initTape(inputString));
  }, [inputString]);

  const setHeadValue = (value: string) => {
    const headPositions = positions.map((position, index) => {
      if (index === head + 10) {
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
        moveTapeHead(direction === 'L' ? -1 : direction === 'R' ? 1 : 0);
      }, duration / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransition]);

  const scrollMore = (isRight: boolean) => {
    const to = isRight ? 65 : -65;

    scroll.scrollMore(to, {
      containerId: `container-tabs-${index}`,
      horizontal: true,
      duration: duration / 10,
      smooth: 'easeOutCubic',
    });
  };

  return (
    <div>
      <img
        src={gradientFilter}
        width="64"
        height="64"
        alt="gradient-filter"
        className="w-16 h-16 absolute -left-8 z-10"
      />
      <img
        src={gradientFilter}
        width="64"
        height="64"
        alt="gradient-filter"
        className="w-16 h-16 absolute -right-8 z-10 -scale-x-100"
      />
      <div
        {...events}
        ref={ref}
        // onScroll={(e) => {
        //   console.log('scroll', e.currentTarget.scrollLeft);
        // }}
        className="flex relative w-[48rem] h-32 overflow-x-hidden"
        id={`container-tabs-${index}`}
      >
        <motion.div
          ref={scrollTape}
          className="tape absolute top-0  flex"
          style={{
            left: `-32px`,
          }}
        >
          {positions.map((position) => {
            return <Square key={position.id} position={position} />;
          })}
        </motion.div>
        <motion.div
          animate={{
            x: head * 64 + 576,
          }}
          className="head w-16 absolute h-[5px] top-[4.5rem] left-[31px] bg-primary-orange"
        ></motion.div>
      </div>
      {/* <div className="flex place-content-between flex-row bottom-0">
        <div
          onClick={() => {
            moveTapeHead(-1);
          }}
          className="w-8 h-8 bg-black"
        ></div>
        <div
          onClick={() => {
            moveTapeHead(1);
          }}
          className="w-8 h-8  bg-red-500 right-16"
        ></div>
      </div> */}
    </div>
  );
};

const initTape = (inputString?: string[]): TapeData[] => {
  const arraySize = Math.max(inputString?.length ?? 0, 12) + 10;
  return new Array(arraySize).fill(0).map((_, i) => {
    return {
      id: i - 10,
      value: inputString
        ? inputString[i - 10]
          ? inputString[i - 10]
          : 'B'
        : 'B',
    };
  });
};
