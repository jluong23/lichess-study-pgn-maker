import { useState } from "react";
import StudyHelp from "../components/StudyHelp";
import TournamentForm, { TournamentDetails } from "../components/TournamentForm";
import useModalContext from "../hooks/useModalContext";

function Study() {
  const modalContext = useModalContext();
  const [tournamentDetails, setTournamentDetails] = useState({player: {}} as TournamentDetails);

  const helpButton = (
    <button 
      className="bg-blue-400 pill-button"
      onClick={() => {modalContext.openModal(<StudyHelp/>)}}>
        Need help?
    </button>
  )

  return (
    <div className="space-y-2">
        <h2>Study PGN Maker</h2>
        {helpButton}
        <TournamentForm tournamentDetails={tournamentDetails} setTournamentDetails={setTournamentDetails}/>
    </div>
  );
}

export default Study;
