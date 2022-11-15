import React, { useState, useEffect } from "react";
import useModalContext from "../../hooks/useModalContext";

interface Props {
    levelReached: number
    numLevels: number
    setQuizRunning: (input: boolean) => void
    currentLife: number
    maxLives: number

}
const QuizEndScreen = ({ levelReached, numLevels, currentLife, maxLives, setQuizRunning }: Props) => {
    const modalContext = useModalContext();
    const QuitButton = ({buttonColorClass}:{buttonColorClass:string}) => {
            return <button onClick={() => { setQuizRunning(false); modalContext.closeModal(); }} className={`pill-button ${buttonColorClass}`}>Play Again?</button>
    }

    const winScreen = <>
        <p>Congratulations, you beat the quiz with {currentLife}/{maxLives} lives!</p>
        <QuitButton buttonColorClass='bg-green-400'/>
    </>

    const lossScreen = <>
        <p>You lose!</p>
        <p>Reached Level {levelReached+1}/{numLevels}</p>
        <QuitButton buttonColorClass='bg-red-400'/>
    </>

    return (
        <div className="flex flex-col space-y-2">
            {levelReached+1 >= numLevels && currentLife > 0 ? winScreen : lossScreen}

        </div>
    );
}

export default QuizEndScreen;