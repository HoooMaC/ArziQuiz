import { useState } from "react";
import Question from "./Question.tsx";

import Timer from "./Timer.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../lib/localMemory.ts";
import QuizResult from "./QuizResult.tsx";

interface quizState {
  quizId: string;
  numberOfQuestions: number;
  correctAnswers: number;
  quizEnd: boolean;
}

const Quiz = () => {
  const { id } = useParams();
  // const [questions, setQuestions] = useState<QuestionType[]>();
  const navigate = useNavigate();
  const questions = getItem("questions");
  const question = questions[Number(id) - 1];

  // i also want to put the data to the local storage
  // after i fetch the api, there will be start button to the first question
  // if the start button clicked, the timer will start

  // so i need a state that hold the status wether the quiz already started or not
  // We need this as a context
  // const [quizStarted, setQuizStarted] = useState<boolean>(false);

  // that means i need a check if the user is valid and the quiz has already started. In every single qustions.
  const [status, setStatus] = useState<quizState>({
    quizId: "knvio7u08923u4mnfvkk;as'fa",
    numberOfQuestions: questions.length,
    correctAnswers: 0,
    quizEnd: false,
  });

  const nextQuestion = (isCorrect: boolean) => {
    if (Number(id) < status.numberOfQuestions) {
      setStatus((prevState) => {
        return {
          ...prevState,
          correctAnswers: isCorrect
            ? prevState.correctAnswers + 1
            : prevState.correctAnswers,
        };
      });
      navigate(`/quiz/${Number(id) + 1}`);
    } else {
      setStatus((prevState) => {
        return {
          ...prevState,
          quizEnd: true,
        };
      });
    }
  };

  return (
    <>
      {status.quizEnd ? (
        <>
          <QuizResult
            numberOfQuestions={status.numberOfQuestions}
            correctAnswers={status.correctAnswers}
            quizEnd={status.quizEnd}
            quizId={status.quizId}
          />
        </>
      ) : (
        <>
          <div
            className={
              "absolute left-0 top-0 ms-4 mt-4 flex size-8 flex-col items-center justify-center rounded-full border-4" +
              " border-primary"
            }
          >
            {id}
          </div>
          <div
            className={"flex flex-grow flex-col items-center justify-center"}
          >
            <div className={"relative flex h-screen w-full flex-col"}>
              {questions && (
                <>
                  <Question
                    question={question}
                    nextQuestion={nextQuestion}
                    index={Number(id)}
                  />
                  <Timer
                    forceNext={() => nextQuestion(false)}
                    currentQuestion={Number(id)}
                  />
                </>
              )}
              <div className={"mb-4 flex flex-grow-0"}>
                <div className={"flex-grow"}></div>

                <div className={"h-full w-1/3"}>
                  <p className={"flex items-center text-emerald-800"}>
                    Correct Answer:
                    <span className={"ms-2 text-xl font-bold"}>
                      {status.correctAnswers}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Quiz;
