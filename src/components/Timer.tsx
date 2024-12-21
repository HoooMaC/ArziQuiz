import { useEffect, useState } from "react";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  forceNext: () => void;
  currentQuestion: number;
}

const Timer = ({ forceNext, currentQuestion }: TimerProps) => {
  const [time, setTime] = useState<number>(10);
  const [prevQuestion, setPrevQuestion] = useState<number>(0);
  // useEffect(() => {
  //   const countdownTimer = setTimeout(() => {
  //     //   -----------------------------------------------------------
  //     if (time > 0) {
  //       setTime((prevState) => prevState - 1);
  //     } else {
  //       //   set show result
  //       forceNext();
  //     }
  //   }, 1000);
  //
  //   return () => clearTimeout(countdownTimer);
  // }, [time, forceNext]);

  useEffect(() => {
    if (prevQuestion !== currentQuestion) {
      setTime(10);
      setPrevQuestion(currentQuestion);
    }
  }, [prevQuestion, currentQuestion]);

  return (
    <div className={"flex items-center"}>
      <TimerIcon className={"me-2 rotate-[-5deg] scale-150 text-primary"} />
      <span className={"me-1 text-xl font-bold text-primary"}>{time}</span>{" "}
      seconds left
    </div>
  );
};
export default Timer;
