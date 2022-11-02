import { useState } from "react";
import useModalContext from "../hooks/useModalContext";
import {BsPlay} from "react-icons/bs";
import {BiNotepad} from "react-icons/bi";
import QuizHelp from "../components/QuizHelp";
import QuizLifeBar from "../components/QuizLifeBar";
function Quiz() {
  const modalContext = useModalContext();
  const playIcon = <BsPlay className="inline text-2xl align-text-top"/>
  const rulesIcon = <BiNotepad className="inline text-xl align-text-top"/>

  const MAX_LIVES = 3;
  const [currentLife, setCurrentLife] = useState(MAX_LIVES);
  const [quizRunning, setQuizRunning] = useState(false);

  const quizMenu = (
    <div className="flex flex-col w-full items-center justify-center space-y-2">
      <div className="w-3/4 max-w-[500px]">
        <img
          className="w-full h-full object-fill" 
          src={`${process.env.PUBLIC_URL}/assets/home/carokann.gif`} 
          alt=""    
        />    

      </div>
      <h2>Chess Openings Quiz</h2>
      <p>How well do you know your openings?</p>
      <p className="text-center">
        Data set retrieved from <a className="hyperlink" href="https://github.com/lichess-org/chess-openings">Lichess</a>
      </p>
      <div id="options" className="space-x-2">
        <button className="pill-button bg-slate-400" onClick={() => {modalContext.openModal(<QuizHelp/>)}}> Rules {rulesIcon} </button>
        <button className="pill-button bg-green-400" onClick={() => {setQuizRunning(true)}}> Play{playIcon}(IN DEVELOPMENT)</button>
      </div>
    </div>
  )

  const quizContent = (
    <div className="relative flex flex-col w-full items-center justify-center space-y-2">
      <div className="quiz-top-bar absolute top-0 flex justify-evenly w-full">
        <QuizLifeBar currentLife={currentLife} maxLives={MAX_LIVES}/>
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
  return quizRunning ? quizContent : quizMenu;
}

export default Quiz;
