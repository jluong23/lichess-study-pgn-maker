import React, { useState, useEffect } from "react";
import useModalContext from "../../hooks/useModalContext";

interface Props {
    score: number
    numLevels : number
    setQuizRunning: (input: boolean) => void

}
const QuizEndScreen = ({score, numLevels, setQuizRunning} : Props ) => {
    const modalContext = useModalContext();
    return (
        <div className="flex flex-col space-y-2">
            <p>End of the quiz...</p>
            <p>You scored {score}/{numLevels}</p>
            <button onClick={() => {setQuizRunning(false); modalContext.closeModal();}} className="pill-button bg-red-400">Quit</button>
        </div>
    );
}

export default QuizEndScreen;