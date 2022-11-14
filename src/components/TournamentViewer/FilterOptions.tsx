
import React, { useState, useEffect } from "react";

const TIME_CONTROLS = ["UltraBullet", "Bullet", "Blitz", "Rapid", "Classical"]
const VARIANTS = ["Standard", "Chess960", "Racing Kings", "Atomic", "Crazyhouse", "Three-Check"]
const TOURNAMENT_STATUSES = ["Starting", "Started", "Finished"]

interface TournamentFilters {
    // the applicable filters to list of tournaments retrieved
    thematic: boolean /** Only show thematic tournaments? */
    status: number
    hasMaxRating: boolean
}

interface Props {
    apiTournamentList: any[] /** All tournaments returned by the api as a single list */
    setTournamentList: (input: any[]) => void /** State setter for the list presented to the user, not apiTournamentList */
}

const FilterOptions = ({ apiTournamentList, setTournamentList }: Props) => {
    const [tournamentFilters, setTournamentFilters] = useState({
        thematic: false,
        status: 0,
        hasMaxRating: false,

    } as TournamentFilters);


    useEffect(() => {
        // use effect for tournament filters, apply the filter on tournamentList state
        let filteredTournaments = [...apiTournamentList]; // initialise filteredTournaments as all tournaments from api response
        if (tournamentFilters.thematic) {
            // only thematic tournaments (tournaments which start with an initial position) have the 'position' property
            filteredTournaments = filteredTournaments.filter((t) => { return t.position });
        } if (tournamentFilters.hasMaxRating){
            filteredTournaments = filteredTournaments.filter((t) => { return t.hasMaxRating });
        }

        // set new tournaments on screen
        console.log(filteredTournaments);
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
            <button className={`pill-button ${tournamentFilters.thematic ? 'bg-green-400' : 'bg-red-400'}`} onClick={onThematicClicked}>Thematic?</button>
            <button className={`pill-button ${tournamentFilters.hasMaxRating ? 'bg-green-400' : 'bg-red-400'}`} onClick={onMaxRatingClicked}> Max Rating?</button>
        </div>
    )
}

export default FilterOptions;