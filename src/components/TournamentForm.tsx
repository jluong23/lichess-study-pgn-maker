import { useState } from "react";
import useModalContext from "../hooks/useModalContext";
import { RoundForm } from "./RoundForm";
import {MdModeEdit, MdOutlineDone} from"react-icons/md"

export type ChessColor = 'White' | 'Black';
export type Result = ChessColor | 'Draw';

export interface ChessPlayer {
  name: string, 
  elo: number
  title?: string
}

export interface ChessRound {
  side: ChessColor,
  opponent: ChessPlayer
  result: Result
  num: number
}
export interface TournamentDetails {
  player: ChessPlayer,
  tournament: string,
  rounds: ChessRound[]
}

interface TournamentFormProps{
  tournamentDetails: TournamentDetails
  setTournamentDetails: (input: TournamentDetails) => void
}


function TournamentForm({tournamentDetails, setTournamentDetails}:TournamentFormProps) {
    const [player, setPlayer] = useState<ChessPlayer>(tournamentDetails.player);
    const [tournament, setTournament] = useState<string>(tournamentDetails.tournament);
    const [rounds, setRounds] = useState<ChessRound[]>(tournamentDetails.rounds)
    const roundFormComponents:any = [];
    const modalContext = useModalContext();

    const formSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newDetails:TournamentDetails = {player, tournament, rounds}
      setTournamentDetails(newDetails);
      modalContext.closeModal();       
    }

    const addRound = () => {
      const newRound = {
        num: rounds ? rounds.length + 1 : 1,
        // First round is white. Next rounds will alternate from previous round
        side: rounds && rounds.length > 0 ? 
          rounds[rounds.length-1].side == 'Black' ? 'White' : 'Black' 
          : 'White',
        opponent: {
          
        },
        result: 'White'
      } as ChessRound
      const newRounds = rounds ? rounds.concat(newRound) : [newRound]  
      setRounds(newRounds);
    }

    const popRound = () => {
      if(rounds && rounds.length >= 1){
        setRounds(rounds.slice(0,rounds.length-1));
      }
    }    

    return (
      <form className="flex flex-col items-start justify-center space-y-1 [&>input]:border-2" onSubmit={formSubmit}>
        <h2>Tournament Details</h2>
        <hr className="h-1 w-full"/>

        <label>Tournament Name: </label>
        <input defaultValue={tournament} onChange={(e) => {setTournament(e.target.value)}}/>

        <label>Player: </label>
        <input 
          defaultValue={player ? player.name : ""} 
          onChange={(e) => {setPlayer(
          (old) => {return {...old, name:e.target.value}}
        )}}
          required
        />

        <label>FIDE ELO: </label>
        <input 
          type={"number"} 
          defaultValue={player ? player.elo : ""} 
          onChange={(e) => {setPlayer(
            (old) => {return {...old, elo:parseInt(e.target.value)}}
          )}}
          
        />
        <span className="flex space-x-1">
          <h2>Rounds</h2>
        </span>

        <div>
          {rounds && rounds.map((round, i) => {
            const component = <RoundForm player={player} round={round} setRounds={setRounds} key={round.num}/>
            roundFormComponents.push(component);
            return component
          })}

        </div>
          <span className="space-x-1">
            <input type="button" className="pill-button bg-blue-400" value={"+"} onClick={addRound}/>
            {/* conditonally render the delete round button */}
            {rounds && rounds.length >= 1 && 
              <input type="button" className="pill-button bg-red-400" value={"-"} onClick={popRound}/>
            }
          </span>
        
        <hr className="h-1 w-full"/>
        
        <span className="space-x-1">
          <input className="pill-button bg-green-400" type="submit" value={"Save"}/>
          <input className="pill-button bg-gray-400" type={"button"} value={"Generate PGN"}/>
        </span>

      </form>
    );
  }
  
  export default TournamentForm;
  