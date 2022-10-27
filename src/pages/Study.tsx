import { useState } from "react";
import ChessBoard from "../components/Game/ChessBoard";
import TournamentForm, { TournamentDetails } from "../components/TournamentForm";
import useModalContext from "../hooks/useModalContext";

function Study() {

  const modalContext = useModalContext();
  const [tournamentDetails, setTournamentDetails] = useState({player: {}} as TournamentDetails);
  return (
    <div className="space-y-2">
        <h2>Study</h2>
        <button 
          className="bg-blue-400 pill-button"
          onClick={() => {modalContext.openModal(<TournamentForm tournamentDetails={tournamentDetails} setTournamentDetails={setTournamentDetails}/>)}}>
            Edit Tournament Details 
        </button>
        <ChessBoard/>
    </div>
  );
}

export default Study;
