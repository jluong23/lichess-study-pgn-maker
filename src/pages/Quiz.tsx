import { useState } from "react";
import QuizGame from "../components/Quiz/QuizGame";
import QuizMenu from "../components/Quiz/QuizMenu";
function Quiz() {

  const [quizRunning, setQuizRunning] = useState(false);

  return quizRunning ? <QuizGame quizRunning={quizRunning} setQuizRunning={setQuizRunning}/> : <QuizMenu setQuizRunning={setQuizRunning}/>;
}

export default Quiz;
