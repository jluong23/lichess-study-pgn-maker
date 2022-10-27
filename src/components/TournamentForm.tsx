import { useState } from "react";
import useModalContext from "../hooks/useModalContext";
import { RoundForm } from "./RoundForm";
import {MdModeEdit, MdOutlineDone} from"react-icons/md"
import {IoMdEye} from "react-icons/io"
import CopyButton from "./CopyButton";

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
    const modalContext = useModalContext();

    const formSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newDetails:TournamentDetails = {player, tournament, rounds, date, timeControl}
      setTournamentDetails(newDetails);
      modalContext.closeModal();             
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

    const createRoundPGN = (round:ChessRound) => {
      if(!round){
        return ''
      }
      const white = round.side == 'White' ? player : round.opponent;
      const black = round.side == 'Black' ? player : round.opponent;
      const moves = "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O" //TODO: Plays the evans gambit
      const pgn = 
`
[Date "${date || ''}"]
[White "${white.name || ''}"]
[Black "${black.name || ''}"]
[Result "${round.result}"]
[WhiteElo "${white.elo || ''}"]
[WhiteTitle "${white.title || ''}"]
[BlackTitle "${black.title || ''}"]
[WhiteElo "${white.elo || ''}"]
[BlackElo "${black.elo || ''}"]
[TimeControl "${timeControl || ''}"]
[Round "${round.num}"]
[Variant "Standard"]
${moves}
`
      return pgn
    }

    const createStudyPGN = () => {
      if(!rounds){
        return ''
      }
      const studyPgn = rounds.map((r) => {return createRoundPGN(r)})
      return studyPgn.join('\n');
    }

    const detailsForm = (
      <div className="[&>span]:flex [&>span]:flex-col [&>span]:items-start">
          <h2>Tournament Details</h2>
          <span>
            <label>Tournament Name: </label>
            <input defaultValue={tournament} onChange={(e) => {setTournament(e.target.value)}}/>
          </span>

          <span>
            <label>Date: </label>
            <input type={'date'} defaultValue={date} onChange={(e) => {setDate(e.target.value)}}/>
          </span>

          <span>
            <label>Time control: </label>
            <input defaultValue={timeControl} onChange={(e) => {setTimeControl(e.target.value)}}/>
          </span>

          <span>
            <label>Player: </label>
            <input 
              defaultValue={player ? player.name : ""} 
              onChange={(e) => {setPlayer(
              (old) => {return {...old, name:e.target.value}}
            )}}
              required
          />
          </span>
          <span>
            <label>ELO: </label>
            <input 
              type={"number"} 
              defaultValue={player ? player.elo : ""} 
              onChange={(e) => {setPlayer(
                (old) => {return {...old, elo:parseInt(e.target.value)}}
              )}}
            />
          </span>
        </div>
    )

    const roundsForm = (
      <div id ='rounds'>
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
          {rounds && rounds.map((round, i) => {
            return <RoundForm editMode={editMode} player={player} round={round} setRounds={setRounds} key={round.num}/>
          })}

          <span className="space-x-1">
            <input type="button" className="pill-button bg-blue-400" value={"+"} onClick={addRound}/>
            {/* conditonally render the delete round button */}
            {rounds && rounds.length >= 1 && 
              <input type="button" className="pill-button bg-red-400" value={"-"} onClick={popRound}/>
            }
          </span>
        </div>
    )
    return (
      <form onSubmit={formSubmit}>
        <div className="sm:flex sm:space-x-4 [&>*]:py-1">
          {detailsForm}    
          {roundsForm}

        </div>
        <span className="space-x-1 flex sm:mt-4">
          <input className="pill-button bg-green-400" type="submit" value={"Save"}/>
          <span className="">
            <CopyButton text="Copy Study PGN" clickedText="Copied" copyText={createStudyPGN()}/>

          </span>
        </span>

      </form>
    );
  }
  
  export default TournamentForm;
  