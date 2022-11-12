import { useState } from "react";
import QuizLifeBar from "./QuizLifeBar";
import openings from "../../openings/openings_novar_sorted.json"
import QuizTimer from "./QuizTimer";

interface Props {
    quizRunning: boolean
    setQuizRunning: (input: boolean) => void
}

interface QuizLevel {
    level: number
    opening: string
    options: string[]
    selected: string //which option did the user select? 
    answer: string
}

/**
 * Get a set of possible openings for the quiz level. 
 * @param level The current quiz level.
 * @param maxLevels How many levels are in the quiz?
 */
function getPossibleOpenings(level:number, maxLevels: number){
    // TODO:
    const levelSize = Math.ceil(openings.length/maxLevels) //the number of openings to choose from for this level
    console.log(level, maxLevels, openings.length, levelSize);
    
}

function QuizGame({ quizRunning, setQuizRunning }: Props) {
    const MAX_LIVES = 3;
    const MAX_LEVELS = 9;
    const [currentLife, setCurrentLife] = useState(MAX_LIVES);
    const [level, setLevel] = useState(1);
    const [opening, setOpening] = useState("<OPENING>");
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
    const quitButton =
        <button
            className="pill-button bg-red-400 text-3xl"
            onClick={() => { setQuizRunning(false) }}>
            Quit
        </button>

    const nextButton =
        <button
            disabled={nextButtonDisabled}
            className="pill-button bg-blue-400 text-3xl disabled:opacity-50 disabled:bg-slate-400"
            onClick={() => { setQuizRunning(false) }}>
            Next Question
        </button>
    return (
        <div className="flex flex-col w-full items-center justify-center space-y-2">
            {/* top bar */}
            <div className="flex justify-evenly w-full [&>*]:justify-center [&>*]:text-center [&>*]:flex">
                <QuizLifeBar currentLife={currentLife} maxLives={MAX_LIVES} />
                <h2 className="flex-1">Question {level}/9</h2>
                <QuizTimer />
            </div>

            {/* middle quiz content */}
            <div className="flex flex-col w-full h-full items-center">
                <div className="quiz-question flex flex-1 items-center">
                    <h2>The {opening} starts with which following moves?</h2>
                </div>
                <div className="flex flex-[2] w-full justify-center">
                    <div className="quiz-options grid grid-cols-2 gap-4">
                        <div>Option 1</div>
                        <div>Option 2</div>
                        <div>Option 3</div>
                        <div>Option 4</div>
                    </div>
                </div>

            </div>
            {/* bottom bar */}
            <div className="w-full flex justify-evenly">
                {quitButton}
                {nextButton}
            </div>
        </div>
    )
}

export default QuizGame;
