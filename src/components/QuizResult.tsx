import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button.tsx";
import { Home, ScrollText } from "lucide-react";

const QuizResult = () => {
  const location = useLocation();
  const quizStatus = location.state.status;

  return (
    <>
      <div className={"flex items-center justify-center"}>
        <ScrollText className={"me-2 text-blue-600"} size={50} />
        <h1 className="text-4xl font-bold text-blue-600">Quiz Result</h1>
      </div>
      <div>
        Final Score: 1000
        <p>Total Questions:{quizStatus.numberOfQuestions} </p>
        <p>Correct Answers: {quizStatus.correctAnswers}</p>
      </div>
      <Button asChild={true}>
        <Link to={"/"} className={"font-normal"}>
          <Home className={"scale-125 text-white"} /> Back to Home
        </Link>
      </Button>
    </>
  );
};
export default QuizResult;
