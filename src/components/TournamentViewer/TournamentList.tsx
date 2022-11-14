import moment from "moment";

interface Props {
    tournamentList: any[] /**The tournament list shown to the user */
}
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

const TournamentList = ({ tournamentList }: Props) => {
    const emptyListOutput = <div>
        Could not find any tournaments using this filter...
    </div>
    const tournamentListOutput = (
        <div>
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
    )
    console.log(tournamentList);
    
    return tournamentList.length > 0 ? tournamentListOutput : emptyListOutput;
}

export default TournamentList;
