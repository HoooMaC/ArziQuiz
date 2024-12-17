import React from "react";
import { useLocation } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const quizStatus = location.state.status;

  return (
    <div>
      <p>Total Questions:{quizStatus.numberOfQuestions} </p>
      {/*<p>Quiz Difficulty: </p>*/}
      <p>Correct Answers: {quizStatus.correctAnswers}</p>
    </div>
  );
};
export default QuizResult;
