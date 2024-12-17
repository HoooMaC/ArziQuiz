import { useState } from "react";
import Question from "./Question.tsx";

import Timer from "./Timer.tsx";
import { useLocation, useNavigate } from "react-router-dom";

interface quizState {
  currentQuestion: number;
  numberOfQuestions: number;
  correctAnswers: number;
  quizEnd: boolean;
}

const Quiz = () => {
  // const [questions, setQuestions] = useState<QuestionType[]>();
  const location = useLocation();
  const questions = location.state.questions;
  const navigate = useNavigate();

  // i also want to put the data to the local storage
  // after i fetch the api, there will be start button to the first question
  // if the start button clicked, the timer will start

  // so i need a state that hold the status wether the quiz already started or not
  // We need this as a context
  // const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // that means i need a check if the user is valid and the quiz has already started. In every single qustions.
  const [status, setStatus] = useState<quizState>({
    currentQuestion: 0,
    numberOfQuestions: 10,
    correctAnswers: 0,
    quizEnd: false,
  });

  const nextQuestion = (isCorrect: boolean) => {
    if (status.currentQuestion + 1 < status.numberOfQuestions) {
      setStatus((prevState) => {
        return {
          ...prevState,
          correctAnswers: isCorrect
            ? prevState.correctAnswers + 1
            : prevState.correctAnswers,
          currentQuestion: prevState.currentQuestion + 1,
        };
      });
    } else {
      setStatus((prevState) => {
        return {
          ...prevState,
          quizEnd: true,
        };
      });
      console.log("Kuis selesai!"); // Anda bisa memanggil fungsi untuk menyelesaikan quiz di sini
      navigate("/quizresult", {
        state: {
          status,
        },
      });
    }
  };

  return (
    <div>
      <p>Correct Answer: {status.correctAnswers}</p>
      <p>Question Number: {status.currentQuestion}</p>

      {status.quizEnd ? (
        <p>quiz ended</p>
      ) : (
        <>
          {questions && (
            <>
              <Question
                question={questions[status.currentQuestion]}
                nextQuestion={nextQuestion}
                index={status.currentQuestion}
              />
              <Timer
                forceNext={() => nextQuestion(false)}
                currentQuestion={status.currentQuestion}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Quiz;
