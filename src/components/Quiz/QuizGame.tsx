import { useState, useEffect } from "react";
import QuizLifeBar from "./QuizLifeBar";
import openings from "../../openings/openings_novar_sorted.json"
import QuizTimer from "./QuizTimer";
import useModalContext from "../../hooks/useModalContext";
import QuizEndScreen from "./QuizEndScreen";

interface Props {
    quizRunning: boolean
    setQuizRunning: (input: boolean) => void
}

interface Opening {
    name: string;
    eco: string;
    pgn: string;
    fen: string;
    winrate: number[];
    games: number;
}

/**
 * For the current quiz level and max level, select and return a random opening.
 * Levels closer to 'numLevels' return a harder / less popular opening.
 * @param level The current quiz level.
 * @param numLevels How many levels are in the quiz?
 */
function getRandomOpening(level: number, numLevels: number) {
    if (level < 0 || level >= numLevels) {
        return null;
    }
    const levelSize = Math.ceil(openings.length / numLevels) //the number of openings to choose from for this level
    const levelOpenings = openings.slice(level * levelSize, level * levelSize + levelSize); // the openings to choose from for this level
    const randomOpening = levelOpenings[Math.floor(Math.random() * levelOpenings.length)];
    return randomOpening;

}

/**
 * Create a quiz level with 1 correct opening and (numOptions - 1) wrong openings.
 * @param level - the current level
 * @param numLevels - the number of levels for difficulty scaling
 * @param numOptions - how many options to select from
 * @returns the correct answer and all possible answers
 */

function createPossibleAnswers(level: number, numLevels: number, numOptions: number) {
    const answer = getRandomOpening(level, numLevels);
    if (!answer) {
        // invalid level given numLevels
        throw new Error(`Invalid 'level' ${level} for 'numLevels' ${numLevels} in createPossibleAnswers`);
    }
    // start creating possible answers
    let possibleAnswers: Opening[] = [];
    possibleAnswers.push(answer); //add the correct opening
    while (possibleAnswers.length < numOptions) {
        // add incorrect openings
        const wrongOpening = getRandomOpening(level, numLevels);
        if (wrongOpening && !possibleAnswers.includes(wrongOpening)) {
            possibleAnswers.push(wrongOpening);
        }
    }
    // shuffle possible answers
    possibleAnswers.sort(() => Math.random() - 0.5);
    return {
        answer, possibleAnswers
    }
}

function QuizGame({ quizRunning, setQuizRunning }: Props) {
    const MAX_LIVES = 3;
    const NUM_LEVELS = 9;
    const QUIZ_OPTIONS = 4; //4 options per question
    const QUIZ_TIME = 30; //seconds
    const modalContext = useModalContext();

    const [currentLife, setCurrentLife] = useState(MAX_LIVES);
    const [level, setLevel] = useState(0); //level of the quiz, from 0 to 'NUM_LEVELS-1'
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [correctOpening, setCorrectOpening] = useState({} as Opening); // the correct opening for the current 'level'
    const [optionSelected, setOptionSelected] = useState<null | Opening>(null); //which opening did the user select?
    const [quizOptions, setQuizOptions] = useState<Opening[]>([]); //length of 'QUIZ_OPTIONS'
    const [showQuizAnswer, setShowQuizAnswer] = useState(false);

    const endScreen = <QuizEndScreen currentLife={currentLife} maxLives={MAX_LIVES} levelReached={level} numLevels={NUM_LEVELS} setQuizRunning={setQuizRunning} />

    useEffect(() => {
        // for each level, change to a new opening
        const { answer, possibleAnswers } = createPossibleAnswers(level, NUM_LEVELS, QUIZ_OPTIONS);
        setCorrectOpening(answer); //store the correct answer 
        setOptionSelected(null); //reset the option selected
        setQuizOptions(possibleAnswers);
    }, [level])

    // use effect for showing the end screen
    useEffect(() => {
        if (currentLife === 0 || optionSelected && level == NUM_LEVELS - 1) {
            // show death screen if 0 lives, or a selection is made on the final question
            modalContext.openModal(endScreen);
        }
    }, [currentLife, optionSelected])

    const nextButton =
        <button
            disabled={nextButtonDisabled}
            className="pill-button bg-blue-400 text-2xl disabled:opacity-50 disabled:bg-slate-400"
            onClick={() => { setLevel(level + 1) }}>
            Next Question
        </button>

    const onQuizOptionClicked = (e:any, option:Opening) => {
        // TODO: Pause the timer
        setShowQuizAnswer(true); //update state to highlight all answers, showing the correct one
        setOptionSelected(option);
        // decrease a life point if the selected option was incorrect
        if(option != correctOpening){
            setCurrentLife(currentLife-1);
        }
        // player can progress to next question
        setNextButtonDisabled(false);
    }

    const getQuizOptionColor = (quizOption: Opening) => {
        if (!showQuizAnswer) {
            // don't show any answers, set quiz option to gray color
            return 'bg-gray-400';
        }
        // green if correct, red if incorrect
        if (quizOption == correctOpening) {
            return 'bg-green-400';
        }
        return 'bg-red-400';
    }

    return (
        <div className="flex flex-col w-full items-center justify-center space-y-2">
            {/* top bar */}
            <div className="flex justify-evenly w-full [&>*]:justify-center [&>*]:text-center [&>*]:flex">
                <QuizLifeBar currentLife={currentLife} maxLives={MAX_LIVES} />
                <h2 className="flex-1">Question {level + 1}/{NUM_LEVELS}</h2>
                <QuizTimer
                    level={level}
                    maxTime={QUIZ_TIME}
                    onCountdown={() => {
                        // timer starts
                        setShowQuizAnswer(false);
                        setNextButtonDisabled(true);
                    }}
                    onTimeOut={() => {
                        // timer runs out
                        if(!optionSelected){
                            // decrease life if the user did not select any option not selected
                            // (if the wrong option was selected, the onClick handler for the option handles)
                            setCurrentLife(currentLife - 1);
                        }
                        setNextButtonDisabled(false);
                        setShowQuizAnswer(true);
                    }}
                />
            </div>

            {/* middle quiz content */}
            <div className="flex flex-col w-full h-full items-center">
                <div className="quiz-question flex flex-1 items-center text-center">
                    <h2>The {correctOpening.name} starts with which following moves?</h2>
                </div>
                <div className="flex flex-[2] w-full justify-center">
                    <div className="quiz-options flex-1 sm:flex-[0.75] w-3/4 grid grid-cols-2 gap-4">
                        {quizOptions && quizOptions.map((option) => {
                            return (
                                <button
                                    key={option.pgn}
                                    className={`pill-button h-1/2 w-full ${getQuizOptionColor(option)}`}
                                    onClick={(e) => {onQuizOptionClicked(e,option)}}
                                    // disable button if player has selected option already
                                    //double negation, converting optionSelected into boolean
                                    disabled={!!optionSelected} 
                                >
                                    {option.pgn}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* bottom bar */}
            <div className="w-full flex justify-evenly">
                {/* show the next button if the player has lives, or the player is not on the final level of quiz */}
                {(level < NUM_LEVELS-1 && currentLife > 0) && nextButton} 
            </div>
        </div>
    )
}

export default QuizGame;
