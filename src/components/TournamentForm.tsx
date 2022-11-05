import { useEffect, useState } from "react";
import { RoundEntry } from "./RoundEntry";
import {MdModeEdit} from"react-icons/md"
import {IoMdEye} from "react-icons/io"
import useModalContext from "../hooks/useModalContext";
import TournamentFormModal from "./TournmanentFormModal";

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
  url: string //url of game in lichess
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

    const [studyPgn, setStudyPgn] = useState<string>(''); //generated on form submit
    const [numSubmitClicked, setNumSubmitClicked] = useState(1); //number of times submit button is clicked, useful for useEffect dependency, opening modal

    const modalContext = useModalContext();
    
    useEffect(() => {      
      if(rounds){
        modalContext.openModal(<TournamentFormModal studyPgn={studyPgn}/>)
      }
    
    }, [studyPgn, numSubmitClicked])
    
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
  
    const formSubmit = async (e: React.FormEvent) => {      
      e.preventDefault();
      if(!rounds || (rounds && rounds.length === 0)){
        modalContext.openModal(<p>Please add at least one round to proceed.</p>)
        return;
      }
      // Sets tournament details for the parent 'Study' component  
      const newDetails:TournamentDetails = {player, tournament, rounds, date, timeControl}
      setTournamentDetails(newDetails);     

      const newStudyPgn = await createStudyPGN();
      
      // update states for this component
      setStudyPgn(newStudyPgn);
      setNumSubmitClicked(numSubmitClicked+1);
    }
    
    /**
     * Get the moves of a chess game played on lichess.
     * @param gameUrl The url of the game
     */
    const fetchMoves = async (gameUrl: string) => {
      // extract game id, string of length 8
      const re = new RegExp('(https:\/\/lichess.org\/)(\\w{8})')
      const match = re.exec(gameUrl);
      if(!match){
        return ''
      }
      const gameId = match[2];
      // get request to API to get game. Remove tags computer evaluation and clock data, keeping only moves
      let response = await fetch(`https://lichess.org/game/export/${gameId}?tags=false&evals=false&clocks=false`);
      let responseText = await response.text();
      return responseText;
    }

    const createRoundPGN = async (round:ChessRound) => {
      if(!round){
        return ''
      }
      const white = round.side === 'White' ? player : round.opponent;
      const black = round.side === 'Black' ? player : round.opponent;
      // if a lichess link exists, fetch the moves. Otherwise use 1. e4 e5
      const moves = round.url && round.url.length > 0 ? await fetchMoves(round.url) : "1. e4 e5";
      const pgn = 
`[Date "${date || ''}"]
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

    const createStudyPGN = async () => {
      if(!rounds){
        return ''
      }
      let output = '';
      const pgnPromises:Promise<string>[] = []

      rounds.forEach((r) => {
        // create promises to create PGN for each round
        pgnPromises.push(createRoundPGN(r));
      })

      // wait for all promises to pgns to be created, then return as string
      await Promise.all(pgnPromises).then((vals) => {
        output = vals.join("\n")}
      ) 
      return output;
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
              // rounds exist, provide option to disable edit mode
              <button type='button' className="pill-button bg-gray-400" onClick={() => {setEditMode(false)}}>
                <IoMdEye/>
              </button>
            }
            {rounds && rounds.length > 0 && !editMode && 
              // rounds exist, provide option to enable edit mode
              <button type='button' className="pill-button bg-red-400" onClick={() => {setEditMode(true)}}>
                <MdModeEdit/>
              </button>   
            }
          </span>
          {rounds && rounds.map((round, i) => {
            return <RoundEntry editMode={editMode} player={player} round={round} setRounds={setRounds} key={round.num}/>
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
          <input className="pill-button bg-blue-400" type="submit" value={"Next"}/>
        </span>

      </form>
    );
  }
  
  export default TournamentForm;
  