import { useState } from "react";
import QuizLifeBar from "./QuizLifeBar";
import openings from "../../openings/openings_novar_sorted.json"
import QuizTimer from "./QuizTimer";

interface Props {
    quizRunning: boolean
    setQuizRunning: (input: boolean) => void
}

function QuizGame({ quizRunning, setQuizRunning }: Props) {
    const MAX_LIVES = 3;
    const [currentLife, setCurrentLife] = useState(MAX_LIVES);
    const [level, setLevel] = useState(1);
    const quitButton =
        <button
            className="pill-button bg-red-400 absolute left-0"
            onClick={() => { setQuizRunning(false) }}>
            Quit
        </button>
    return (
        <div className="relative flex flex-col w-full items-center justify-center space-y-2">
            <div className="absolute top-0 flex justify-evenly w-full [&>*]:justify-center [&>*]:text-center [&>*]:flex">
                {quitButton}
                <QuizLifeBar currentLife={currentLife} maxLives={MAX_LIVES} />
                <h2 className="flex-1">Question {level}/9</h2>
                <QuizTimer/>
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
