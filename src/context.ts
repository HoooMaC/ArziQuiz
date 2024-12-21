import { createContext, useContext } from "react";
import { QuestionType } from "./types/type.ts";

export const QuestionContext = createContext<QuestionType[] | undefined>(
  undefined,
);

export const useQuestionsContext = (): QuestionType[] => {
  const questions = useContext(QuestionContext);

  if (questions === undefined) {
    throw new Error("is undefined for QuestionContext");
  }

  return questions;
};

export const useQuestionFromQuestionsContext = (
  index: number,
): QuestionType => {
  const questions = useQuestionsContext();

  return questions[index];
};
