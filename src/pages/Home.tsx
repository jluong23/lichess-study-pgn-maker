import { useState } from "react";
import ChessBoard from "../components/Game/ChessBoard";
import TournamentForm, { TournamentDetails } from "../components/TournamentForm";
import useModalContext from "../hooks/useModalContext";

function Home() {

  const modalContext = useModalContext();
  const [tournamentDetails, setTournamentDetails] = useState({player: {}} as TournamentDetails);
  return (
    <div>
        <h1>Home</h1>
        <div className="p-1 space-y-2">
          <button 
            className="bg-blue-400 pill-button"
            onClick={() => {modalContext.openModal(<TournamentForm tournamentDetails={tournamentDetails} setTournamentDetails={setTournamentDetails}/>)}}>
              Edit Tournament Details 
          </button>
        </div>
        <ChessBoard/>
    </div>
  );
}

export default Home;
