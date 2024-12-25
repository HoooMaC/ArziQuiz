import { Link } from "react-router-dom";
import { Button } from "./ui/button.tsx";
import { Home, ScrollText } from "lucide-react";
import { removeItem } from "../lib/localMemory.ts";

const QuizResult = (props: {
  quizId: string;
  numberOfQuestions: number;
  correctAnswers: number;
  quizEnd: boolean;
}) => {
  return (
    <div
      className={
        "flex h-full min-h-screen w-full max-w-[500px] flex-col " + "p-4"
      }
    >
      <div
        className={
          "flex h-full flex-grow flex-col items-center justify-center gap-8 rounded-3xl border-2 border-primary p-4"
        }
      >
        <div className={"flex items-center justify-center"}>
          <ScrollText className={"me-2 text-blue-600"} size={50} />
          <h1 className="text-4xl font-bold text-blue-600">Quiz Result</h1>
        </div>
        <div className={"flex w-full flex-grow flex-col gap-2 text-xl"}>
          <div className="flex">
            <p className={"flex-grow"}>Total Questions: </p>
            <span className={"basis-1/6 font-medium text-primary"}>
              {props.numberOfQuestions}
            </span>
          </div>
          <div className="flex">
            <p className={"flex-grow"}>Correct Answers: </p>
            <span className={"basis-1/6 font-medium text-primary"}>
              {props.correctAnswers}
            </span>
          </div>
          <div className="flex">
            <p className={"flex-grow"}>Final Score:</p>
            <span className={"basis-1/6 font-medium text-primary"}>
              {(props.correctAnswers / props.numberOfQuestions) * 1000}
            </span>
          </div>
        </div>
        <Button
          onClick={() => {
            removeItem("questions");
          }}
          className={"w-full"}
          asChild={true}
        >
          <Link to={"/"} className={"font-normal"}>
            <Home className={"scale-125 text-white"} /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default QuizResult;
