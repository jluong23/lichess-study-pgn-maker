import { useState, useEffect } from "react";
import StudyHelp from "../components/Study/StudyHelp";
import TournamentForm, { TournamentDetails } from "../components/Study/TournamentForm";
import useModalContext from "../hooks/useModalContext";

function Study() {
  const modalContext = useModalContext();
  const emptyTournamentDetails = { player: {} } as TournamentDetails;
  const storedTournamentDetails = localStorage.getItem('tournamentDetails') ? JSON.parse(localStorage.getItem('tournamentDetails') || `{}`)  : emptyTournamentDetails;
  
  const [tournamentDetails, setTournamentDetails] = useState(storedTournamentDetails);
  useEffect(() => {
    localStorage.setItem('tournamentDetails', JSON.stringify(tournamentDetails));
  }, [tournamentDetails])

  const helpButton = (
    <button
      className="bg-blue-400 pill-button"
      onClick={() => { modalContext.openModal([<StudyHelp page={1} />, <StudyHelp page={2} />]) }}>
      Need help?
    </button>
  )

  return (
    <div className="space-y-2">
      <h2>Study PGN Maker</h2>
      {helpButton}
      <TournamentForm tournamentDetails={tournamentDetails} setTournamentDetails={setTournamentDetails} />
    </div>
  );
}

export default Study;
