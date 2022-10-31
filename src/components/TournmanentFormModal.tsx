import CopyButton from "./CopyButton";
import { useState } from "react";

interface Props {
    studyPgn: string
}

function TournamentFormModal ({studyPgn} : Props) {
    const [textAreaPgn, setTextAreaPgn] = useState(studyPgn);

    return (
        // when the form is submitted, open this modal
        <div className="flex flex-col space-y-2">
            <h2>Study PGN</h2>
            <textarea className="h-48" defaultValue={textAreaPgn} onChange={(e) => {setTextAreaPgn(e.target.value);}}/>
            <CopyButton text="Copy Study PGN" clickedText="Copied" copyText={textAreaPgn}/>
            <p>
                Create or open an existing study on <a className="hyperlink" href="https://lichess.org/study"> https://lichess.org/study</a> 
            </p>
    
        </div>
    )
    
} 

export default TournamentFormModal