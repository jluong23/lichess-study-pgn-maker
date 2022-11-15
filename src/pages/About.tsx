import { Link } from "react-router-dom";

function About() {
  return (
    <div className="max-w-lg space-y-2 colored-hyperlinks">
      <h2>About</h2>
      <p>This site contains a collection of tools for online chess.</p>
      <p>The primary tool is the <Link to="/study">Study PGN Maker</Link>,
        a dynamic form for creating formatted PGNs with tags for tournament results.
        This reduces the effort of typing out repeated details for each round.
      </p>
      <p>The <Link to="/quiz">openings quiz </Link> uses the openings dataset on lichess provided <a href="https://github.com/lichess-org/chess-openings">here</a>.</p>
      <p>
        The <Link to="/tournaments">tournament viewer </Link>lists the arenas on <a href="https://lichess.org/tournament">https://lichess.org/tournament</a>, providing filter controls
        by variants, tournament status, time control, etc. 
      </p>
      <p>This site is open source! See the code <a href="https://github.com/jluong23/lichess-study-pgn-maker">here</a>.</p>
      <p>Created by <a href="https://github.com/jluong23">James Luong</a> (Add me on <a href="https://lichess.org/@/courage212">Lichess</a>)</p>
    </div>
  );
}

export default About;
