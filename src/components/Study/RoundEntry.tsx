import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { FaChessKing } from "react-icons/fa";
import { ChessColor, ChessPlayer, ChessRound, getGameId, getOppositeColor, Result } from "./TournamentForm";

interface RoundEntryProps {
  player: ChessPlayer // the player details, used for formatting in view mode
  round: ChessRound //the round to render the form for
  setRounds: any //setter for parent state (TournamentForm)
  editMode: boolean
}

export const RoundEntry = ({ editMode, player, round, setRounds }: RoundEntryProps) => {
  const [side, setSide] = useState(round.side);
  const [url, setUrl] = useState(round.url);
  const [opponent, setOpponent] = useState(round.opponent);
  const [result, setResult] = useState(round.result);
  const [iconColor, setIconColor] = useState(side === 'White' ? 'Gray' : 'Black');

  const toggleSide = () => {
    // swap color of 'side' state
    const newColor = getOppositeColor(side);
    const iconColor = newColor === 'White' ? 'Gray' : 'Black';
    setSide(newColor);
    setIconColor(iconColor)
  }

  // update rounds in parent component if input states change
  useEffect(() => {
    setRounds((oldRounds: ChessRound[]) => {
      return oldRounds.map((r) => {
        if (r.num === round.num) {
          return { side, opponent, result, url, num: round.num } as ChessRound
        } else {
          return r;
        }
      })
    })
  }, [side, opponent, result, url])

  const editModeOutput = () => (
    <React.Fragment>
      {/*Round number and player color*/}
      <div className="flex items-center space-x-1">
        <h2>{round.num})</h2>
        <IconContext.Provider value={{ color: iconColor }}>
          <FaChessKing className="cursor-pointer" onClick={toggleSide} />
        </IconContext.Provider>
        <span>vs</span>
      </div>
      <div className="space-x-1">
        {/* opponent details */}
        <input
          className="w-10"
          placeholder="Title"
          defaultValue={opponent.title}
          onChange={(e) => {
            setOpponent(
              (old) => { return { ...old, title: e.target.value } })
          }}
        />
        <input
          placeholder="Name"
          defaultValue={opponent.name}
          onChange={(e) => { setOpponent((old) => { return { ...old, name: e.target.value } }) }}
        />
        <input
          className="w-14"
          type={"number"}
          placeholder="ELO"
          defaultValue={opponent.elo}
          onChange={(e) => {
            setOpponent(
              (old) => { return { ...old, elo: parseInt(e.target.value) } })
          }}
        />
        <input
          placeholder="Team"
          className="w-32"
          defaultValue={opponent.team}
          onChange={(e) => { setOpponent((old) => { return { ...old, team: e.target.value } }) }}
        />
        <select
          onChange={(e) => { setResult(e.target.value as Result); }}
          defaultValue={result}
        >
          <option value={'1-0'}>1-0</option>
          <option value={'0-1'}>0-1</option>
          <option value={'1/2-1/2'}>&frac12;-&frac12;</option>
        </select>

        <input
          placeholder="Lichess URL"
          defaultValue={round.url}
          onChange={e => { setUrl(e.target.value); }}
        />
      </div>
    </React.Fragment>
  )

  const viewModeOutput = () => {
    const formatPlayer = (player: ChessPlayer, side: ChessColor) => {
      // player formatted in JSX
      let eloOutput = player.elo ? `(${player.elo})` : ""
      let titleOutput = <span className="text-[rgb(156,107,30)]">{`${player.title || ''}`}</span>
      let nameOutput = player.name ? player.name : side;
      return <span>{titleOutput} {nameOutput} {eloOutput}</span>
    }
    const opponentName = formatPlayer(opponent, getOppositeColor(round.side))
    const playerName = formatPlayer(player, round.side)

    const pairing = side === 'White' ?
      <span>
        {playerName} vs {opponentName}
      </span>
      :
      <span>
        {opponentName} vs {playerName}
      </span>


    // provide link to game if valid (game id can be retrieved from game, but not necessarily a valid id)
    const roundResult = getGameId(round.url) ?
      <a className="hyperlink" href={round.url}>[{round.result}]</a>
      :
      <React.Fragment>[{round.result}]</React.Fragment>;

    return (
      <React.Fragment>
        <p>{round.num}) {pairing} {roundResult}</p>
      </React.Fragment>
    )
  }


  return (
    <div className="round-entry">
      {editMode ? editModeOutput() : viewModeOutput()}
    </div>
  )
}