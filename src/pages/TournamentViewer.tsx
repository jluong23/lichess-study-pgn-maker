import React, { useState, useEffect } from "react";
import FilterOptions from "../components/TournamentViewer/FilterOptions";
import TournamentList from "../components/TournamentViewer/TournamentList";

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

  return (
    <div>
      <h2>Tournaments</h2>
      <FilterOptions apiTournamentList={flattenTournaments(apiResponse)} setTournamentList={setTournamentList}/>
      <TournamentList tournamentList={tournamentList}/>
    </div>
  );
}


export default TournamentViewer;
