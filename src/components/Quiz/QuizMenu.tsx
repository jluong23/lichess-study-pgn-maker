import { BiNotepad } from "react-icons/bi";
import { BsPlay } from "react-icons/bs";
import QuizHelp from "../../components/Quiz/QuizHelp";
import useModalContext from "../../hooks/useModalContext";

interface Props {
    setQuizRunning: (input: boolean) => void
}

const QuizMenu = ({ setQuizRunning }: Props) => {
    const rulesIcon = <BiNotepad className="inline text-xl align-text-top" />
    const playIcon = <BsPlay className="inline text-2xl align-text-top" />
    const modalContext = useModalContext();

    return (
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
                Data set retrieved and adapted from <a className="hyperlink" href="https://github.com/lichess-org/chess-openings">Lichess</a>
            </p>
            <div id="options" className="space-x-2">
                <button className="pill-button bg-slate-400" onClick={() => { modalContext.openModal(<QuizHelp />) }}> Rules {rulesIcon} </button>
                <button className="pill-button bg-green-400" onClick={() => { setQuizRunning(true) }}> Play {playIcon}</button>
            </div>
        </div>
    )
}

export default QuizMenu;