import { useState } from "react";
import useModalContext from "../hooks/useModalContext";

interface TournamentDetails {
  player: string,
  tournament: string,
  elo: number,
}
interface TournamentFormProps{
  tournamentDetails: TournamentDetails
  setTournamentDetails: (input: TournamentDetails) => void
}

function TournamentForm(props:TournamentFormProps) {

    const [player, setPlayer] = useState(props.tournamentDetails.player);
    const [tournament, setTournament] = useState(props.tournamentDetails.tournament);
    const [elo, setElo] = useState(props.tournamentDetails.elo);
    const modalContext = useModalContext();


    const formSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formDetails = {player, tournament, elo}
      //save formDetails spread over old details before form opened (props.tournamentDetails)
      const newDetails = {...props.tournamentDetails, ...formDetails };
      props.setTournamentDetails(newDetails);
      modalContext.closeModal();
      
    }

    return (
      <form className="flex flex-col items-start space-y-1 [&>input]:border-2" onSubmit={formSubmit}>
        <h2>Tournament Details</h2>
        <hr className="h-1 w-full"/>

        <label>Tournament Name: </label>
        <input defaultValue={tournament} onChange={(e) => {setTournament(e.target.value)}} required/>

        <label>Player: </label>
        <input defaultValue={player} onChange={(e) => {setPlayer(e.target.value)}} required/>

        <label>FIDE ELO: </label>
        <input type={"number"} defaultValue={elo} onChange={(e) => {setElo(parseInt(e.target.value))}} required/>

        <h2>Rounds</h2>
        <hr className="h-1 w-full"/>

        <input className="pill-button bg-green-400" type="submit" value={"Save"} required/>

      </form>
    );
  }
  
  export default TournamentForm;
  