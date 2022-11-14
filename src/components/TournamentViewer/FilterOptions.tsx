
import React, { useState, useEffect } from "react";

const TIME_CONTROLS = ["UltraBullet", "Bullet", "Blitz", "Rapid", "Classical"]

const VARIANTS = ["Standard", "Chess960", "RacingKings", "Atomic", "CrazyHouse", "ThreeCheck", 'Horde']
const TOURNAMENT_STATUSES: { [key: string]: number } = { "Upcoming": 10, "Ongoing": 20, "Finished": 30 }

interface TournamentFilters {
    // the applicable filters to list of tournaments retrieved
    thematic: boolean /** Only show thematic tournaments? */
    status: number
    hasMaxRating: boolean
    timeControl: string
    variant: string
}

const defaultFilterOptions:TournamentFilters = {
    thematic: false,
    status: 0,
    hasMaxRating: false,
    timeControl: '',
    variant: '',
}

interface Props {
    apiTournamentList: any[] /** All tournaments returned by the api as a single list */
    setTournamentList: (input: any[]) => void /** State setter for the list presented to the user, not apiTournamentList */
}

const FilterOptions = ({ apiTournamentList, setTournamentList }: Props) => {
    const [tournamentFilters, setTournamentFilters] = useState(defaultFilterOptions);

    useEffect(() => {
        // use effect for tournament filters, apply the filter on tournamentList state
        let filteredTournaments = [...apiTournamentList]; // initialise filteredTournaments as all tournaments from api response
        if (tournamentFilters.thematic) {
            // only thematic tournaments (tournaments which start with an initial position) have the 'position' property
            filteredTournaments = filteredTournaments.filter((t) => { return t.position });
        } if (tournamentFilters.hasMaxRating) {
            filteredTournaments = filteredTournaments.filter((t) => { return t.hasMaxRating });
        } if (tournamentFilters.status) {
            filteredTournaments = filteredTournaments.filter((t) => { return t.status == tournamentFilters.status });
        } if (tournamentFilters.timeControl != '') {
            filteredTournaments = filteredTournaments.filter((t) => { return t.schedule.speed == tournamentFilters.timeControl });
        } if(tournamentFilters.variant != '') {
            filteredTournaments = filteredTournaments.filter((t) => { return t.variant.key.toLowerCase() == tournamentFilters.variant });
            
        }
        // set new tournaments on screen
        setTournamentList(filteredTournaments);
    }, [tournamentFilters]);

    const onThematicClicked = (e: React.FormEvent) => {
        setTournamentFilters((old) => {
            // toggle the thematic field in tournamentFilters
            return { ...old, thematic: !old.thematic };
        });
    };

    const onMaxRatingClicked = (e: React.FormEvent) => {
        setTournamentFilters((old) => {
            return { ...old, hasMaxRating: !old.hasMaxRating };
        });
    };

    return (
        <div id="filters" className="space-x-2">
            {/* tournament status */}
            <select id="tournament-status" value={tournamentFilters.status} onChange={(e) => {
                setTournamentFilters((old) => {
                    return { ...old, status: parseInt(e.target.value) }
                });
            }}>
                <option>Tournament Status</option>
                {/* display tournament status options (starting, started, finished), using status codes as value attribute for option tag */}
                {Object.keys(TOURNAMENT_STATUSES).map((t) =>
                    <option key={t} value={TOURNAMENT_STATUSES[t]}>{t}</option>
                )}
            </select>

            {/* tournament time control */}
            <select id="time-control" value={tournamentFilters.timeControl} onChange={(e) => {
                setTournamentFilters((old) => {
                    return { ...old, timeControl: e.target.value };
                });
            }}>
                <option value={""}>Time Control</option>
                {TIME_CONTROLS.map((t) => <option key={t} value={t.toLowerCase()}>{t}</option>)}
            </select>

            {/* tournament variant */}
            <select id="variant" value={tournamentFilters.variant} onChange={(e) => {
                setTournamentFilters((old) => {
                    return { ...old, variant: e.target.value };
                });
            }}>
                <option value="">Variant</option>
                {VARIANTS.map((v) => <option key={v} value={v.toLowerCase()}>{v}</option>)}
            </select>

            {/* buttons */}
            <button className={`pill-button ${tournamentFilters.thematic ? 'bg-green-400' : 'bg-red-400'}`} onClick={onThematicClicked}>Thematic?</button>
            <button className={`pill-button ${tournamentFilters.hasMaxRating ? 'bg-green-400' : 'bg-red-400'}`} onClick={onMaxRatingClicked}> Max Rating?</button>
            <button className="pill-button bg-slate-400" onClick={() => {setTournamentFilters(defaultFilterOptions)}}>Reset</button>
        </div>
    )
}

export default FilterOptions;