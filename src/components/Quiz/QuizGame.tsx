import { useState } from "react";
import QuizLifeBar from "./QuizLifeBar";
import openings from "../../openings/openings_novar_sorted.json"

interface Props {
    quizRunning: boolean
    setQuizRunning: (input: boolean) => void
}

function QuizGame({ quizRunning, setQuizRunning }: Props) {
    const MAX_LIVES = 3;
    const [currentLife, setCurrentLife] = useState(MAX_LIVES);
    return (
        <div className="relative flex flex-col w-full items-center justify-center space-y-2">
            <div className="absolute top-0 flex justify-evenly w-full [&>*]:flex-1 [&>*]:justify-center [&>*]:text-center [&>*]:flex">
                <QuizLifeBar currentLife={currentLife} maxLives={MAX_LIVES} />
                <h2>Question 1/9</h2>
                <h2>60/60</h2>
            </div>
            <div className="quiz-question">
                Quiz Question
            </div>
            <div className="quiz-options grid grid-cols-2 gap-4">
                <div>Option 1</div>
                <div>Option 2</div>
                <div>Option 3</div>
                <div>Option 4</div>

            </div>
        </div>
    )
}

export default QuizGame;
