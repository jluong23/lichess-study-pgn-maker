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

interface QuizLevel {
    level: number
    opening: string
    options: string[]
    selected: string //which option did the user select? 
    answer: string
}

interface Opening{
    name: string
    pgn: string
    eco: string
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

function QuizGame({ quizRunning, setQuizRunning }: Props) {
    const MAX_LIVES = 3;
    const NUM_LEVELS = 9;
    const modalContext = useModalContext();
    const possibleAnswerClass = "pill-button bg-gray-400 h-1/2";
    const correctAnswerClass = "pill-button bg-green-400 h-1/2";
    const wrongAnswerClass = "pill-button bg-red-400 h-1/2";


    const [currentLife, setCurrentLife] = useState(MAX_LIVES);
    const [level, setLevel] = useState(0);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [finishButtonDisabled, setFinishButtonDisabled] = useState(false);
    const [opening, setOpening] = useState({} as Opening);
    const [possibleAnswers, setPossibleAnswers] = useState<Opening[]>([]);

    const endScreen = <QuizEndScreen score={NUM_LEVELS} numLevels={NUM_LEVELS} setQuizRunning={setQuizRunning} />

    useEffect(() => {
        // for each level, change to a new opening
        const newOpening = getRandomOpening(level, NUM_LEVELS);
        let newPossibleAnswers = [];
        if (newOpening) {
            setOpening(newOpening);
            // generate possible answers
            newPossibleAnswers.push(newOpening);
            while(newPossibleAnswers.length < 4){
                const wrongOpening = getRandomOpening(level, NUM_LEVELS);
                if(wrongOpening && !newPossibleAnswers.includes(wrongOpening)){
                    newPossibleAnswers.push(wrongOpening);
                }
            }
            newPossibleAnswers.sort(() => Math.random() - 0.5);
            setPossibleAnswers(newPossibleAnswers);
        }
    }, [level])

    console.log(possibleAnswers);
    
    useEffect(() => {
        if(currentLife===0){
            modalContext.openModal(endScreen);
        }
    }, [currentLife])
    
    const nextButton =
        <button
            disabled={nextButtonDisabled}
            className="pill-button bg-blue-400 text-2xl disabled:opacity-50 disabled:bg-slate-400"
            onClick={() => { setLevel(level + 1) }}>
            Next Question
        </button>

    const finishButton =
        <button
            className="pill-button bg-green-400 text-2xl disabled:opacity-50 disabled:bg-slate-400"
            disabled={finishButtonDisabled}
            onClick={() => { modalContext.openModal(endScreen)}}>
            Finish
        </button>

    const onQuizOptionClicked = (e:any) => {
        const buttonPressed = e.target;
        if(buttonPressed.textContent == opening.pgn){
            buttonPressed.className = correctAnswerClass;
        }else{
            buttonPressed.className = wrongAnswerClass;
        }
    }
    return (
        <div className="flex flex-col w-full items-center justify-center space-y-2">
            {/* top bar */}
            <div className="flex justify-evenly w-full [&>*]:justify-center [&>*]:text-center [&>*]:flex">
                <QuizLifeBar currentLife={currentLife} maxLives={MAX_LIVES} />
                <h2 className="flex-1">Question {level + 1}/9</h2>
                <QuizTimer
                    level={level}
                    onCountdown={() => {
                        setNextButtonDisabled(true);
                    }}
                    onTimeOut={() => { 
                        setCurrentLife(currentLife - 1); 
                        setNextButtonDisabled(false);
                    }}
                />
            </div>

            {/* middle quiz content */}
            <div className="flex flex-col w-full h-full items-center">
                <div className="quiz-question flex flex-1 items-center text-center">
                    <h2>The {opening.name} starts with which following moves?</h2>
                </div>
                <div className="flex flex-[2] w-full justify-center">
                    <div className="quiz-options grid grid-cols-2 gap-4">
                        {possibleAnswers.map((answer) => {
                            return <button key={answer.pgn} onClick={(e) => onQuizOptionClicked(e)} className={possibleAnswerClass}>{answer.pgn}</button>
                        })}
                    </div>
                </div>

            </div>
            {/* bottom bar */}
            <div className="w-full flex justify-evenly">
                {level === NUM_LEVELS - 1 ? finishButton : nextButton}
            </div>
        </div>
    )
}

export default QuizGame;
