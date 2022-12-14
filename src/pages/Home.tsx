import HomeScreenCard from "../components/Home/HomeScreenCard";

function Home() {

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2">
      <div id="title" className="space-y-1">
        <h1 className="font-bold block text-center">A collection of chess study tools</h1>
      </div>
      <div className="w-full flex flex-col space-y-2 sm:grid sm:grid-cols-3">
        <HomeScreenCard onClickUrl="/study" title="Study PGN Maker" description="Create PGN tournament results for your Lichess studies" imgSrc={`${process.env.PUBLIC_URL}/assets/home/pgn-results.png`}/>
        <HomeScreenCard onClickUrl="/quiz" title="Openings Quiz" description="How well do you know your openings?" imgSrc={`${process.env.PUBLIC_URL}/assets/home/carokann.gif`}/>
        <HomeScreenCard onClickUrl="/tournaments" title="Tournament Viewer" description="Check upcoming Lichess tournaments" imgSrc={`${process.env.PUBLIC_URL}/assets/home/tournament_viewer.png`}/>
      </div>
    </div>
  );
}

export default Home;
