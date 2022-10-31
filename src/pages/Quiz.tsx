import { useState } from "react";
import ChessBoard from "../components/Game/ChessBoard";
import useModalContext from "../hooks/useModalContext";
import {BsPlay} from "react-icons/bs"
function Quiz() {
  const modalContext = useModalContext();
  const playIcon = <BsPlay className="inline text-2xl align-text-top"/>

  const easyModeContent = <div>

  </div>

  const hardModeContent = <div>

  </div>
  return (
    <div className="flex flex-col w-full items-center justify-center space-y-2">
      <h2>Chess Openings Quiz</h2>
      <p>How well do you know your openings?</p>
      <p className="text-center">
        Data set retrieved from <a className="hyperlink" href="https://github.com/lichess-org/chess-openings">Lichess</a>
      </p>
      <div id="difficulties" className="space-x-2">
        <button className="pill-button bg-blue-400" onClick={() => {modalContext.openModal(easyModeContent)}}> Easy {playIcon} </button>
        <button className="pill-button bg-red-400" onClick={() => {modalContext.openModal(hardModeContent)}}> Hard {playIcon} </button>
      </div>
    </div>
  );
}

export default Quiz;
