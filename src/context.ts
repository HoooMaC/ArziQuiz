import { createContext, useContext } from "react";

export interface QuestionType {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

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
