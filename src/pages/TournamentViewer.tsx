import { useState, useEffect } from "react";

interface CurrentTournaments {
  // list of tournaments fetched by api
  created: any[]
  started: any[]
  finished: any[]
}

/**
 * Return the tournament status as a string
 * @param tournament 
 * @returns 
 */
function getTournamentStatus(tournament: any) {
  switch (tournament.status) {
    case 10: return "Starting";
    case 20: return "Started";
    case 30: return "Finished";
  }
}

/**
 * Returns a single list of tournaments, merging created, started and finished lists.
 * @param currentTournaments 
 * @returns 
 */
function flattenTournaments(currentTournaments: CurrentTournaments) {
  if (!currentTournaments || Object.keys(currentTournaments).length === 0) {
    return [];
  }
  const { created, started, finished } = currentTournaments;
  return created.concat(started, finished);
}


function TournamentViewer() {
  const [tournaments, setTournaments] = useState<CurrentTournaments>({} as CurrentTournaments);

  useEffect(() => {
    // fetch tournaments
    fetch('https://lichess.org/api/tournament')
      .then((response) => response.json())
      .then((responseJson) => {
        setTournaments(responseJson);
      }
      );
  }, []);

  const tournamentList = flattenTournaments(tournaments);
  // only thematic tournaments (tournaments which start with an initial position) have the 'position' property
  const thematicTournaments = tournamentList.filter((t) => { return t.position });

  return (
    <div>
      <h2>Thematic Tournaments</h2>
      {thematicTournaments.map((t) => {
        const tournamentUrl = `https://lichess.org/tournament/${t.id}`;
        const link = <a href={tournamentUrl} className="hyperlink">{getTournamentStatus(t)}</a>
        return (
          <p key={t.id}>
            {t.fullName} {link}
          </p>
        );
      })}
    </div>
  );
}


export default TournamentViewer;
