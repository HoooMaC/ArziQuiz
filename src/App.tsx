import "./App.css";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Input } from "./components/ui/input.tsx";
import { Label } from "./components/ui/label.tsx";
import { Button } from "./components/ui/button.tsx";
import { useState } from "react";

const categories = [
  { id: 0, category: "Any Category" },
  { id: 1, category: "General Knowledge" },
  { id: 2, category: "Entertainment: Books" },
  { id: 3, category: "Entertainment: Film" },
  { id: 4, category: "Entertainment: Music" },
  { id: 5, category: "Entertainment: Musicals & Theatres" },
  { id: 6, category: "Entertainment: Television" },
  { id: 7, category: "Entertainment: Video Games" },
  { id: 8, category: "Entertainment: Board Games" },
  { id: 9, category: "Science & Nature" },
  { id: 10, category: "Science: Computers" },
  { id: 11, category: "Science: Mathematics" },
  { id: 12, category: "Mythology" },
  { id: 13, category: "Sports" },
  { id: 14, category: "Geography" },
  { id: 15, category: "History" },
  { id: 16, category: "Politics" },
  { id: 17, category: "Art" },
  { id: 18, category: "Celebrities" },
  { id: 19, category: "Animals" },
];
interface QuizSettings {
  numberOfQuestions: number;
  quizCategory: number;
  quizDifficulty: string;
}

function App() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<QuizSettings>({
    numberOfQuestions: 10,
    quizCategory: 0,
    quizDifficulty: "easy",
  });

  const startQuiz = async () => {
    const url = `https://opentdb.com/api.php?amount=${settings.numberOfQuestions}&difficulty=${settings.quizDifficulty}&type=multiple${settings.quizCategory !== 0 ? `&category${settings.quizCategory}` : ""}`;
    console.log(url);
    try {
      const data = await fetch(url);
      const res = await data.json();
      console.log(res.response_code);
      if (res.response_code == 0) {
        console.log("from home");
        console.log(res.results);
        navigate("/quiz", { state: { questions: res.results } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="px-12 py-12 text-4xl font-bold text-blue-600">
        Hello World
      </h1>
      <hr />
      <p>{settings.numberOfQuestions}</p>
      <p>{settings.quizCategory}</p>
      <p>{settings.quizDifficulty}</p>
      <hr />
      <div className={"flex w-96 flex-col space-y-4 rounded-xl"}>
        {/*Input type number for number of question */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="numberOfQuestions">Number of Questions</Label>
          <Input
            name="numberOfQuestions"
            type="number"
            value={settings.numberOfQuestions}
            onChange={(e) => {
              return setSettings((prevState) => {
                return {
                  ...prevState,
                  numberOfQuestions: e.target.valueAsNumber,
                };
              });
            }}
          />
        </div>
        {/*Select Dropdown for Difficulty input*/}
        <Select
          onValueChange={(e) => {
            return setSettings((prevState) => {
              return {
                ...prevState,
                quizDifficulty: e,
              };
            });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="easy">easy</SelectItem>
              <SelectItem value="medium">medium</SelectItem>
              <SelectItem value="hard">hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*Select Dropdown for Difficulty*/}
        <Select
          onValueChange={(e) => {
            return setSettings((prevState) => {
              return {
                ...prevState,
                quizCategory: Number(e),
              };
            });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/*Start Button*/}
        <Button onClick={startQuiz}>Start Quiz</Button>
      </div>
    </div>
  );
}

export default App;
