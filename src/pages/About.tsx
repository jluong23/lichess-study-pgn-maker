import { Link } from "react-router-dom";

function About() {
  return (
    <div className="max-w-lg space-y-2">
      <h2>About</h2>
      <p>This site contains a collection of tools for online chess.</p>
      <p>The primary tool is the <Link to="/study" className="hyperlink">Study PGN Maker</Link>,
        a dynamic form for creating formatted PGNs with tags for tournament results.
        This reduces the effort of typing out repeated details for each round.
      </p>
      <p>The <Link className="hyperlink" to="/quiz">openings quiz </Link> is still under development.</p>
      <p>This site is open source! See the code <a className="hyperlink" href="https://github.com/jluong23/lichess-study-pgn-maker">here</a>.</p>
      <p>James Luong (Add me on <a href="https://lichess.org/@/courage212" className="hyperlink">Lichess</a>)</p>
    </div>
  );
}

export default About;
