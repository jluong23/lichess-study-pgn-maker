import { useEffect, useState } from "react";
import { RoundEntry } from "./RoundEntry";
import { MdModeEdit } from "react-icons/md"
import { IoMdEye } from "react-icons/io"
import useModalContext from "../../hooks/useModalContext";
import TournamentFormModal from "./TournmanentFormModal";

export type ChessColor = 'White' | 'Black';
export type Result = '1-0' | '0-1' | '1/2-1/2'

export interface ChessPlayer {
	name: string
	elo: number
	title?: string
	team: string
}

export interface ChessRound {
	side: ChessColor //what side was the player on?
	opponent: ChessPlayer //played on the opposite color to 'side'
	result: Result
	num: number
	url: string //url of game in lichess
}
export interface TournamentDetails {
	player: ChessPlayer
	tournament: string
	rounds: ChessRound[]
	date: string
	timeControl: string
	site: string
}

interface TournamentFormProps {
	tournamentDetails: TournamentDetails
	setTournamentDetails: (input: TournamentDetails) => void
}

export const getOppositeColor = (side: ChessColor) => {
	// mapping from white to black and vice versa
	switch (side) {
		case 'White': return 'Black';
		case 'Black': return 'White';
	}
}

/**
 * Get a lichess game id from a url.
 * @param lichessUrl The url of the game, truncated to string of length 8.
 */
export const getGameId = (lichessUrl: string) => {
	// extract game id, string of length 8
	const re = new RegExp('(https:\/\/lichess.org\/)(\\w{8})')
	const match = re.exec(lichessUrl);
	if (!match) {
		return null;
	}
	// select 2nd group
	return match[2];
}

/**
 * Returns a promise the moves of a chess game played on lichess.
 * @param gameUrl The url of the game
 */
const fetchMoves = (gameUrl: string) => {
	const gameId = getGameId(gameUrl);
	if (!gameId) {
		return '';
	}
	// get request to API to get game. Remove tags computer evaluation and clock data, keeping only moves
	return fetch(`https://lichess.org/game/export/${gameId}?tags=false&evals=false&clocks=false`)
		.then((response) => {
			if (response.ok) {
				return response.text()
			} else if (response.status === 404) {
				// for 404 errors: invalid game urls
				return Promise.reject(`Invalid Game URL ${gameUrl}\n`)
			} else {
				return Promise.reject(`An error occured while fetching ${gameUrl}\n`)
			}
		})
		.then((responseText) => { return responseText })
		.catch((e) => {
			// throw error with the promise reject message
			throw new Error(e)
		})
}

function TournamentForm({ tournamentDetails, setTournamentDetails }: TournamentFormProps) {
	const [player, setPlayer] = useState<ChessPlayer>(tournamentDetails.player);
	const [tournament, setTournament] = useState<string>(tournamentDetails.tournament);
	const [rounds, setRounds] = useState<ChessRound[]>(tournamentDetails.rounds)
	const [date, setDate] = useState<string>(tournamentDetails.date);
	const [timeControl, setTimeControl] = useState<string>(tournamentDetails.timeControl);
	const [site, setSite] = useState<string>(tournamentDetails.site);

	const [editMode, setEditMode] = useState(false);

	const [studyPgn, setStudyPgn] = useState<string>(''); //generated on form submit
	const [numSubmitClicked, setNumSubmitClicked] = useState(1); //number of times submit button is clicked, useful for useEffect dependency, opening modal

	const modalContext = useModalContext();

	useEffect(() => {
		// open the modal if the submit button is clicked (and pgn is created)
		if (rounds) {
			modalContext.openModal(<TournamentFormModal studyPgn={studyPgn} />)
		}

	}, [studyPgn, numSubmitClicked])

	const addRound = () => {
		const newRound = {
			num: rounds ? rounds.length + 1 : 1,
			// First round is white. Next rounds will alternate from previous round
			side: rounds && rounds.length > 0 ?
				getOppositeColor(rounds[rounds.length - 1].side)
				: 'White',
			opponent: {

			},
			result: '1-0'
		} as ChessRound
		const newRounds = rounds ? rounds.concat(newRound) : [newRound]
		setRounds(newRounds);
	}

	const popRound = () => {
		if (rounds && rounds.length >= 1) {
			setRounds(rounds.slice(0, rounds.length - 1));
		}
	}

	const formSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!rounds || (rounds && rounds.length === 0)) {
			modalContext.openModal(<p>Please add at least one round to proceed.</p>)
			return;
		}
		// Sets tournament details for the parent 'Study' component  
		const newDetails: TournamentDetails = { player, tournament, rounds, date, timeControl, site }
		setTournamentDetails(newDetails);

		const newStudyPgn = await createStudyPGN();

		// update states for this component
		setStudyPgn(newStudyPgn);
		setNumSubmitClicked(numSubmitClicked + 1);
	}


	const createRoundPGN = async (round: ChessRound) => {
		if (!round) {
			return ''
		}
		const white = round.side === 'White' ? player : round.opponent;
		const black = round.side === 'Black' ? player : round.opponent;
		let moves = "";
		// if a lichess round url exists and is valid (has a game id), fetch the moves
		if (round.url && round.url.length > 0 && getGameId(round.url)) {
			try {
				moves = await fetchMoves(round.url);
			} catch (error: any) {
				// don't show PGN, return the error message
				return error;
			}
		}

		const pgn =
			`[Date "${date || ''}"]
[White "${white.name || ''}"]
[WhiteTeam "${white.team || ''}"]
[WhiteElo "${white.elo || ''}"]
[WhiteTitle "${white.title || ''}"]
[Black "${black.name || ''}"]
[BlackTeam "${black.team || ''}"]
[BlackElo "${black.elo || ''}"]
[BlackTitle "${black.title || ''}"]
[Result "${round.result}"]
[TimeControl "${timeControl || ''}"]
[Event "${tournament || ''}"]
[Round "${round.num}"]
[Site "${site || ''}"]
[Variant "Standard"]

${moves}
`
		return pgn
	}

	const createStudyPGN = async () => {
		if (!rounds) {
			return ''
		}
		let output = '';
		const pgnPromises: Promise<string>[] = []

		rounds.forEach((r) => {
			// create promises to create PGN for each round
			pgnPromises.push(createRoundPGN(r));
		})

		// wait for all promises to pgns to be created, then return as string
		await Promise.all(pgnPromises).then((vals) => {
			output = vals.join("\n")
		}
		)
		return output;
	}

	const tournamentDetailsForm = (
		<div className="[&>span]:flex [&>span]:flex-col [&>span]:items-start">
			<span>
				<label>Tournament Name: </label>
				<input defaultValue={tournament} onChange={(e) => { setTournament(e.target.value) }} />
			</span>

			<span>
				<label>Date: </label>
				<input type={'date'} defaultValue={date} onChange={(e) => { setDate(e.target.value) }} />
			</span>

			<span>
				<label>Time control: </label>
				<input defaultValue={timeControl} onChange={(e) => { setTimeControl(e.target.value) }} />
			</span>

			<span>
				<label>Venue / Site: </label>
				<input defaultValue={site} onChange={(e) => { setSite(e.target.value) }} />
			</span>
		</div>
	)

	const playerDetailsForm = (
		<div className="[&>span]:flex [&>span]:flex-col [&>span]:items-start">
			<span>
				<label>Player: </label>
				<input
					defaultValue={player ? player.name : ""}
					onChange={(e) => {
						setPlayer(
							(old) => { return { ...old, name: e.target.value } }
						)
					}}
				/>
			</span>
			<span>
				<label>ELO: </label>
				<input
					type={"number"}
					defaultValue={player ? player.elo : ""}
					onChange={(e) => {
						setPlayer(
							(old) => { return { ...old, elo: parseInt(e.target.value) } }
						)
					}}
				/>
			</span>
			<span>
				<label>Team: </label>
				<input
					defaultValue={player ? player.team : ""}
					onChange={(e) => {
						setPlayer(
							(old) => { return { ...old, team: e.target.value } }
						)
					}}
				/>
			</span>
		</div>
	)

	const roundsForm = (
		<div id='rounds'>
			<span className="flex space-x-1">
				<p className="font-bold">Rounds</p>
				{rounds && rounds.length > 0 && editMode &&
					// rounds exist, provide option to disable edit mode
					<button type='button' className="pill-button bg-gray-400" onClick={() => { setEditMode(false) }}>
						<IoMdEye />
					</button>
				}
				{rounds && rounds.length > 0 && !editMode &&
					// rounds exist, provide option to enable edit mode
					<button type='button' className="pill-button bg-red-400" onClick={() => { setEditMode(true) }}>
						<MdModeEdit />
					</button>
				}
			</span>
			{rounds && rounds.map((round) => {
				return <RoundEntry editMode={editMode} player={player} round={round} setRounds={setRounds} key={round.num} />
			})}

			<span className="space-x-1">
				<input type="button" className="pill-button bg-blue-400" value={"+"} onClick={addRound} />
				{/* conditonally render the delete round button */}
				{rounds && rounds.length >= 1 &&
					<input type="button" className="pill-button bg-red-400" value={"-"} onClick={popRound} />
				}
			</span>
		</div>
	)
	return (
		<form onSubmit={formSubmit}>
			<div className="sm:flex sm:space-x-4 [&>*]:py-1">
				{playerDetailsForm}
				{tournamentDetailsForm}
				{roundsForm}
			</div>
			<span className="space-x-1 flex sm:mt-4">
				<input className="pill-button bg-blue-400" type="submit" value={"Next"} />
			</span>

		</form>
	);
}

export default TournamentForm;
