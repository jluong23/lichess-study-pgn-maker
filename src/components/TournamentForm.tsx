import { useState } from "react";
import useModalContext from "../hooks/useModalContext";
import { RoundForm } from "./RoundForm";
import {MdModeEdit, MdOutlineDone} from"react-icons/md"
import {IoMdEye} from "react-icons/io"

export type ChessColor = 'White' | 'Black';
export type Result = '1-0' | '0-1' | '1/2-1/2'

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
  date: string,
  timeControl: string
}

interface TournamentFormProps{
  tournamentDetails: TournamentDetails
  setTournamentDetails: (input: TournamentDetails) => void
}

export const getOppositeColor = (side:ChessColor) => {
  // mapping from white to black and vice versa
  switch (side) {
    case 'White': return 'Black';
    case 'Black': return 'White';
  }
}

function TournamentForm({tournamentDetails, setTournamentDetails}:TournamentFormProps) {
    const [player, setPlayer] = useState<ChessPlayer>(tournamentDetails.player);
    const [tournament, setTournament] = useState<string>(tournamentDetails.tournament);
    const [rounds, setRounds] = useState<ChessRound[]>(tournamentDetails.rounds)
    const [date, setDate] = useState<string>(tournamentDetails.date);
    const [timeControl, setTimeControl] = useState<string>(tournamentDetails.timeControl);
    
    const [editMode, setEditMode] = useState(false);
    const roundFormComponents:any = [];
    const modalContext = useModalContext();

    const formSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newDetails:TournamentDetails = {player, tournament, rounds, date, timeControl}
      setTournamentDetails(newDetails);
      modalContext.closeModal();       
      console.log(newDetails);
      
    }

    const addRound = () => {
      const newRound = {
        num: rounds ? rounds.length + 1 : 1,
        // First round is white. Next rounds will alternate from previous round
        side: rounds && rounds.length > 0 ? 
          getOppositeColor(rounds[rounds.length-1].side) 
          : 'White',
        opponent: {
          
        },
        result: '1-0'
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
      <form className="flex flex-col items-start justify-center space-y-1" onSubmit={formSubmit}>
        <h2>Tournament Details</h2>

        <span className="flex flex-col">
          <label>Tournament Name: </label>
          <input defaultValue={tournament} onChange={(e) => {setTournament(e.target.value)}}/>
        </span>

        <span className="flex flex-col">
          <label>Date: </label>
          <input type={'date'} defaultValue={date} onChange={(e) => {setDate(e.target.value)}}/>
        </span>

        <span className="flex flex-col">
          <label>Time control: </label>
          <input className="w-12" defaultValue={timeControl} onChange={(e) => {setTimeControl(e.target.value)}}/>
        </span>

        <span className="flex flex-col">
          <label>Player: </label>
          <input 
            defaultValue={player ? player.name : ""} 
            onChange={(e) => {setPlayer(
            (old) => {return {...old, name:e.target.value}}
          )}}
            required
        />

        </span>
        <span className="flex flex-col">
          <label>ELO: </label>
          <input 
            type={"number"} 
            defaultValue={player ? player.elo : ""} 
            onChange={(e) => {setPlayer(
              (old) => {return {...old, elo:parseInt(e.target.value)}}
            )}}
          />
        </span>

        <span className="flex space-x-1">
          <h2>Rounds</h2>
          {rounds && rounds.length > 0 && editMode && 
              <button type='button' className="pill-button bg-gray-400" onClick={() => {setEditMode(false)}}>
                <IoMdEye/>
              </button>
          }
          {rounds && rounds.length > 0 && !editMode && 
            <button type='button' className="pill-button bg-red-400" onClick={() => {setEditMode(true)}}>
              <MdModeEdit/>
            </button>
          }
        </span>

        <div>
          {rounds && rounds.map((round, i) => {
            return <RoundForm editMode={editMode} player={player} round={round} setRounds={setRounds} key={round.num}/>
          })}

        </div>
          <span className="space-x-1">
            <input type="button" className="pill-button bg-blue-400" value={"+"} onClick={addRound}/>
            {/* conditonally render the delete round button */}
            {rounds && rounds.length >= 1 && 
              <input type="button" className="pill-button bg-red-400" value={"-"} onClick={popRound}/>
            }
          </span>
        
        
        <span className="space-x-1">
          <input className="pill-button bg-green-400" type="submit" value={"Save"}/>
          <input className="pill-button bg-gray-400" type={"button"} value={"Copy Study PGN"}/>
        </span>

      </form>
    );
  }
  
  export default TournamentForm;
  