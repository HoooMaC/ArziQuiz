import { QuestionType } from "./Quiz.tsx";
import { Button } from "./ui/button.tsx";
import { shuffle } from "../lib/utils.ts";

type QuestionProps = {
  index: number;
  nextQuestion: (isCorrect: boolean) => void;
  question: QuestionType;
};

const Question = ({ nextQuestion, question }: QuestionProps) => {
  //   we need to take the params
  // if the params e.g is 1 the take from the array questions context index 1

  const options: string[] = shuffle([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);

  const answer = (answer: string) => {
    let isCorrect = false;
    if (answer === question.correct_answer) {
      isCorrect = true;
      console.log("CORRECT");
    }
    nextQuestion(isCorrect);
  };
  return (
    <div>
      <div>
        <h1>Question : {question.question}</h1>
        <p>Category: {question.category}</p>

        <div className="flex flex-col space-y-2">
          {options.map((option, index) => (
            <Button
              key={`${index}`}
              variant={"outline"}
              onClick={() => answer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Question;
