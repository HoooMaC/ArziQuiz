import { QuestionType } from "../types/type.ts";
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
    }
    nextQuestion(isCorrect);
  };
  return (
    <div className={"flex h-full w-full max-w-[500px] flex-col"}>
      <div className={"mb-4 mt-8"}>
        <h1
          className={"mb-2 text-center text-3xl font-bold text-primary"}
          dangerouslySetInnerHTML={{ __html: question.question }}
        >
          {/*Hallo*/}
        </h1>
        <p
          className={"font-medium text-blue-400"}
          dangerouslySetInnerHTML={{ __html: "Category: " + question.category }}
        />
      </div>

      <div className="flex w-full flex-col space-y-2">
        {options.map((option, index) => (
          <Button
            key={`${index}`}
            variant={"outline"}
            onClick={() => answer(option)}
            dangerouslySetInnerHTML={{ __html: option }}
          ></Button>
        ))}
      </div>
    </div>
  );
};
export default Question;
