import { useState } from "react";
import { FaChessKing } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

function StudyHelp() {
    const addRoundButton = <input type="button" className="pill-button bg-blue-400" value={"+"}/>
    const popRoundButton = <input type="button" className="pill-button bg-red-400" value={"-"}/>
    const viewRoundsButton = <button type='button' className="pill-button bg-gray-400"><IoMdEye/></button>
    const editRoundsButton = <button type='button' className="pill-button bg-red-400"><MdModeEdit/></button>
    const kingIcon = <button><FaChessKing className="align-text-bottom"/></button>
    return(
        <div className="w-fit">
            <h2 className="font-bold">How to use Study PGN Maker</h2>
            <ol>
                <li>Fill in the <em>Tournament Details</em> form, clicking <em>Copy Study PGN</em> when complete.
                    <ul>
                        <li>Click {addRoundButton} and {popRoundButton} to add and delete rounds.</li>
                        <li>You can edit opponent details for each round by clicking {editRoundsButton} </li>
                        <li>View pairings by clicking {viewRoundsButton}</li>
                        <li>Change the side you played by clicking the {kingIcon} icon.</li>
                    </ul>
                </li>
                <li>
                    Create or open an existing study on
                    <a className="hyperlink" href="https://lichess.org/study"> https://lichess.org/study</a> 
                </li>
                <li>
                    Import your rounds via <em>'Add a new chapter' - 'PGN'</em>
                    <div className="w-[70%] h-[70%] ml-auto mr-auto">
                        <img className="opacity-75 w-full h-full" src={`${process.env.PUBLIC_URL}/assets/home/studypgn-tutorial.gif`}></img>
                    </div>
                </li>
            </ol>
        </div>

    )
}

export default StudyHelp;
