import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import useModalContext from "../hooks/useModalContext";
import {FaChessKing} from "react-icons/fa";
import { ChessPlayer, ChessRound, Result } from "./TournamentForm";

interface RoundFormProps{
    player: ChessPlayer // the player details, used for formatting in view mode
    round: ChessRound //the round to render the form for
    setRounds: any //setter for parent state (TournamentForm)
    editMode: boolean
    setEditMode: (input: boolean) => void
  }
  
export const RoundForm = ({editMode, setEditMode, player, round, setRounds}:RoundFormProps) => {  
    const [side, setSide] = useState(round.side);
    const [opponent, setOpponent] = useState(round.opponent);
    const [result, setResult] = useState(round.result);
    const [iconColor, setIconColor] = useState(side == 'White' ? 'Gray' : 'Black');
    
    const toggleSide = () => {
      // swap color of 'side' state
      const newColor = side == 'White' ? 'Black' : 'White'; 
      const iconColor = newColor == 'White' ? 'Gray' : 'Black';
      setSide(newColor);
      setIconColor(iconColor)    
    }

    // update rounds in parent component if input states change
    useEffect(() => {setRounds((oldRounds:ChessRound[]) => {
      return oldRounds.map((r) => {
        if(r.num == round.num){
          return {side, opponent, result, num:round.num} as ChessRound 
        }else{
          return r;
        }
      })
    })}, [side, opponent, result])
  
    const editModeOutput = () => (
      <div className="flex items-center h-10 space-x-1 space-y-0 [&>input]:border-2 [&>select]:border-2">
        <h2>{round.num})</h2>
        <IconContext.Provider value ={{color: iconColor}}>
          <FaChessKing className="cursor-pointer" onClick={toggleSide} />
        </IconContext.Provider>
        <p>vs</p>
        <input 
          className="w-10" 
          placeholder="Title"
          defaultValue={opponent.title}
          onChange={(e) => {setOpponent(
            (old) => {return {...old, title: e.target.value}})}}
          />
        <input 
          placeholder="Name" 
          defaultValue={opponent.name}
          onChange={(e) => {setOpponent((old) => {return {...old, name: e.target.value}})}}
        />
        <input 
          className="w-14" 
          type={"number"} 
          placeholder="ELO"
          defaultValue={opponent.elo}
          onChange={(e) => {setOpponent(
            (old) => {return {...old, elo: parseInt(e.target.value)}})}}
        />
        <select 
          onChange={(e) => {setResult(e.target.value as Result);}}
          defaultValue={result}
        >
          <option value={'White'}>1-0</option>
          <option value={'Black'}>0-1</option>
          <option value={'Draw'}>&frac12;-&frac12;</option>
        </select>

        
      </div>
    )
  
    const viewModeOutput = () => {
      if(!opponent.name || !player.name){
        return <div><h3>{round.num})</h3></div>
      }
      const formatPlayer = (player:ChessPlayer) => {
        // player formatted in JSX
        let eloOutput = player.elo ? `(${player.elo})` : ""
        let titleOutput = <span className="text-[rgb(156,107,30)]">{`${player.title || ''}`}</span>
        let nameOutput = player.name;
        return <span>{titleOutput} {nameOutput} {eloOutput}</span>
      }
      const opponentName = formatPlayer(opponent)
      const playerName = formatPlayer(player)
      
      const pairing = side == 'White' ? 
      <span>
        {playerName} vs {opponentName}
      </span>
       : 
       <span>
       {opponentName} vs {playerName} 
        </span>

      let pairingResult;
      switch(result) {
          case 'White':
              pairingResult = <span>(1-0)</span>
              break;
          case 'Black':
              pairingResult = <span>(0-1)</span>
              break
          case 'Draw':
              pairingResult = <span>(&frac12;-&frac12;)</span>;
              break;
      }
      return (
          <div>
              <h3>{round.num}) {pairing} {pairingResult}</h3>
          </div>
      )
    }
        
  
    return editMode ? editModeOutput() : viewModeOutput()
  }