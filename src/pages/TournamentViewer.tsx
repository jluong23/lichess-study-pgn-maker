import React, { useState, useEffect } from "react";
import moment from "moment";

interface TournamentFilters {
  // the applicable filters to list of tournaments retrieved
  thematic: boolean /** Only show thematic tournaments? */
}

const TIME_CONTROLS = ["UltraBullet", "Bullet", "Blitz", "Rapid", "Classical"]
const VARIANTS = ["Standard", "Racing Kings", "Chess960", "Atomic", "Crazyhouse"]
const TOURNAMENT_STATUSES = ["Starting", "Started", "Finished"]
/**
 * Return the tournament status as a string, displaying the time of the tournament.
 * @param tournament 
 * @returns 
 */
function getTournamentStatus(tournament: any) {
  const tournamentDate = moment.unix(tournament.startsAt / 1000); //divide by 1000, converting ms to s
  const formattedDate = `${tournamentDate.fromNow()} (${tournamentDate.format("LT")})`

  switch (tournament.status) {
    case 10: return `Starting ${formattedDate}`;
    case 20: return `Started ${formattedDate}`;
    case 30: return `Finished ${formattedDate}`;
  }
}

/**
 * Returns a single list of tournaments, merging 'created', 'started' and 'finished' lists returned by the lichess API.
 * @param currentTournaments - the API response object as JSON.
 * @returns A single list of tournaments.
 */
function flattenTournaments(currentTournaments: any) {
  if (!currentTournaments || Object.keys(currentTournaments).length === 0) {
    return [];
  }
  const { created, started, finished } = currentTournaments;
  return created.concat(started, finished);
}


function TournamentViewer() {
  const [tournamentList, setTournamentList] = useState([] as any[]);
  const [apiResponse, setApiResponse] = useState({} as any);
  const [tournamentFilters, setTournamentFilters] = useState({
    thematic: false
  } as TournamentFilters);

  useEffect(() => {
    // fetch tournaments using API on component mount
    fetch('https://lichess.org/api/tournament')
      .then((response) => response.json())
      .then((responseJson) => {
        setApiResponse(responseJson);
        const flatTournamentList = flattenTournaments(responseJson);
        setTournamentList(flatTournamentList);
      }
      );
  }, []);


  useEffect(() => {
    // use effect for tournament filters, apply the filter on tournamentList state
    let filteredTournaments = flattenTournaments(apiResponse); // initialise filteredTournaments as all tournaments from api response
    if (tournamentFilters.thematic) {
      // only thematic tournaments (tournaments which start with an initial position) have the 'position' property
      filteredTournaments = tournamentList.filter((t) => { return t.position });
    }
    setTournamentList(filteredTournaments);
  }, [tournamentFilters]);

  const thematicButtonColor = tournamentFilters.thematic ? 'bg-green-400' : 'bg-red-400';
  const onThematicButtonClicked = (e: React.FormEvent) => {
    setTournamentFilters((old) => {
      // toggle the thematic field in tournamentFilters
      return { ...old, thematic: !old.thematic };
    });
  };

  const FilterOptions = () => {
    return (
      <div id="filters" className="space-x-2">
        <select>
          <option>Tournament Status</option>
          {TOURNAMENT_STATUSES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select>
          <option>Time Control</option>
          {TIME_CONTROLS.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select>
          <option>Variant</option>
          {VARIANTS.map((v) => <option key={v}>{v}</option>)}
        </select>
        <button className={`pill-button ${thematicButtonColor}`} onClick={onThematicButtonClicked}>Thematic?</button>
      </div>
    )
  }


  return (
    <div>
      <h2>Tournaments</h2>
      <FilterOptions/>
      {tournamentList.map((t) => {
        const tournamentUrl = `https://lichess.org/tournament/${t.id}`;
        const link = <a href={tournamentUrl} className="hyperlink">{t.fullName}</a>
        return (
          <p key={t.id}>
            {link} {getTournamentStatus(t)}
          </p>
        );
      })}
    </div>
  );
}


export default TournamentViewer;
