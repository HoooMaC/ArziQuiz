import React, { useState } from "react";
import { difficulties } from "../constant/difficulties.ts";
import { Button } from "./ui/button.tsx";
import { Label } from "./ui/label.tsx";
import { Input } from "./ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";
import { useNavigate } from "react-router-dom";
import { setItem } from "../lib/localMemory.ts";

interface QuizSettings {
  numberOfQuestions: number;
  quizDifficulty: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<QuizSettings>({
    numberOfQuestions: 10,
    quizDifficulty: "easy",
  });

  const startQuiz = async () => {
    setIsLoading(true);
    const url = `https://opentdb.com/api.php?amount=${settings.numberOfQuestions}&difficulty=${settings.quizDifficulty}&type=multiple`;
    //
    try {
      const data = await fetch(url);
      const res = await data.json();
      //
      if (res.response_code == 0) {
        // alse add some quiz id to verify the current user and not continuing past quiz
        // we can use local storage here

        setItem("questions", res.results);
        setIsLoading(false);
        navigate("/quiz/1");
      }
    } catch (error) {
      setIsLoading(false);
      //
    } finally {
      //
    }
  };
  const updateNumberOfQuestionValue = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    return setSettings((prevState) => {
      return {
        ...prevState,
        numberOfQuestions: e.target.valueAsNumber,
      };
    });
  };
  const updateDifficultyValue = (e: string) => {
    function convertIdtoDifficulty(input: string): string {
      switch (input) {
        case "1":
          return "easy";
        case "2":
          return "medium";
        case "3":
          return "hard";
      }
      return "easy";
    }
    return setSettings((prevState) => {
      return {
        ...prevState,
        quizDifficulty: convertIdtoDifficulty(e),
      };
    });
  };
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-blue-600">Arzi Quiz</h1>
      <div className={"flex w-full max-w-[500px] flex-col space-y-2"}>
        <QuestionNumberInput
          updateNumberOfQuestion={updateNumberOfQuestionValue}
          value={settings.numberOfQuestions}
        />
        <InputSelector
          options={difficulties}
          label={"select difficulty"}
          updateFunction={updateDifficultyValue}
        />

        {/*Start Button*/}
        <Button disabled={isLoading} onClick={startQuiz}>
          {isLoading ? "Preparing the questions" : "Start Quiz"}
        </Button>
      </div>
    </>
  );
};

function QuestionNumberInput({
  updateNumberOfQuestion,
  value,
}: {
  updateNumberOfQuestion: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="numberOfQuestions">Number of Questions</Label>
      <Input
        name="numberOfQuestions"
        type="number"
        value={value}
        max={30}
        min={10}
        onChange={updateNumberOfQuestion}
      />
    </div>
  );
}

function InputSelector<T extends { id: number; value: string }>({
  updateFunction,
  options,
  label,
}: {
  label: string;
  options: T[];
  updateFunction: (value: string) => void;
}) {
  return (
    <Select onValueChange={updateFunction}>
      <SelectTrigger className="">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id.toString()}>
              {option.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Home;
