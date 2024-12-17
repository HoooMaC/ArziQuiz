import React, {useEffect, useState} from 'react'
import {Link, Outlet, useParams} from "react-router-dom";
import {Button} from "./components/ui/button.tsx";


interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,

}

const Quiz = () => {
    const [questions, setQuestions] = useState<Question[]>()

    // how to track the quiz time? using state or other???

    // i want to fetch api here
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple').then(res => res.json()).then(data => {
            // console.log(data);
            if(data.response_code == 0)
                setQuestions(data.results);

        });
    }, []);


    // i also want to put the data to the local storage
    // after i fetch the api, there will be start button to the first question
    // if the start button clicked, the timer will start

    // so i need a state that hold the status wether the quiz already started or not
    const [quizStarted, setQuizStarted] = useState<boolean>(false)
    // after the quiz started, i dont need a state to track the current questions
    // alternatively, i can use params

    // that means i need a check if the user is valid and the quiz has already started. In every single qustions.


    // there is a button in this template. To navigate next or prev question

    const startQuiz = () => {
        return setQuizStarted(true);
    }

    const {id} = useParams();

    return (
        <div>
            {questions?.map((question: Question, index: number) => {
                return (
                    <div id={`quiz_${index}`}>
                        
                        <h1>Question : {question.question}</h1>
                        <p>Category: {question.category}</p>

                        <ul>
                            <li><p>a. {question.incorrect_answers[0]}</p></li>
                            <li><p>b. {question.incorrect_answers[1]}</p></li>
                            <li><p>c. {question.incorrect_answers[2]}</p></li>
                            <li><p>d. {question.correct_answer}</p></li>
                        </ul>

                        <hr/>
                        
                    </div>
                );
            })}
            {/*{quizStarted ? (<></>) : (*/}
            {/*    <Button asChild={true} onClick={startQuiz}><Link to={'/quiz/1'}>Start</Link></Button>)}*/}
            <Outlet/>
            {/*{quizStarted && (<>*/}
            {/*    navigation button */}
            {/* TEMP: JUST for the logic */}
            {/* TODO: Really need to be fixed */}
            {/*<Button asChild={true}><Link to={`/quiz/${id as number + 1}`}>Next</Link></Button>*/}
            {/*<Button asChild={true}><Link to={`/quiz/${id as number - 1}`}>Previous</Link></Button>*/}
            {/*</>)}*/}
        </div>
    )
}
export default Quiz
