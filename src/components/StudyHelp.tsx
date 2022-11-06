import { FaChessKing } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

interface Props {
    /**Which page of StudyHelp to retrieve from? As StudyHelp is placed in a modal with steps */
    page: number
}

function StudyHelp({ page }: Props) {
    const addRoundButton = <input type="button" className="pill-button bg-blue-400" value={"+"} />
    const popRoundButton = <input type="button" className="pill-button bg-red-400" value={"-"} />
    const viewRoundsButton = <button type='button' className="pill-button bg-gray-400"><IoMdEye /></button>
    const editRoundsButton = <button type='button' className="pill-button bg-red-400"><MdModeEdit /></button>
    const kingIcon = <button><FaChessKing className="align-text-bottom" /></button>

    const pageOneContent = (
        <p>Fill in the <em>Tournament Details</em> form, clicking <em>Next</em> when complete.
            <ul>
                <li>Click {addRoundButton} and {popRoundButton} to add and delete rounds.</li>
                <li>You can edit opponent details for each round by clicking {editRoundsButton} </li>
                <li>View pairings by clicking {viewRoundsButton}</li>
                <li>Change the side you played by clicking the {kingIcon} icon.</li>
                {/* <li>Played online or already imported into Lichess? Copy the game URL to transfer the moves over.</li> */}
            </ul>
        </p>
    )
    const pageTwoContent = (
        <p>
            <ul>
                <li>Create or open an existing study on <a className="hyperlink" href="https://lichess.org/study"> https://lichess.org/study</a></li>
                <li>Import your rounds via <em>'Add a new chapter' - 'PGN'</em></li>
            </ul>
            <div className="w-[70%] h-[70%] ml-auto mr-auto">
                <img alt="Chess openings quiz gif, caro kann main line" className="opacity-75 w-full h-full" src={`${process.env.PUBLIC_URL}/assets/home/studypgn-tutorial.gif`}></img>
            </div>
        </p>
    )

    // assign content variable from props.page
    let content;
    switch(page){
        case 1: content = pageOneContent; break;
        case 2: content = pageTwoContent; break;
    }

    return (
        <div className="w-fit">
            <h2 className="font-bold">How to use Study PGN Maker</h2>
            {content}
        </div>

    )
}

export default StudyHelp;
