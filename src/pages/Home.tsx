import { useState } from "react";
import ChessBoard from "../components/Game/ChessBoard";
import HomeScreenCard from "../components/HomeScreenCard";
import TournamentForm, { TournamentDetails } from "../components/TournamentForm";
import useModalContext from "../hooks/useModalContext";

function Home() {

  const modalContext = useModalContext();
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2">
      <div id="title" className="space-y-1">
        <h1 className="font-bold block text-center">A collection of chess study tools</h1>
      </div>
      <div className="w-full flex flex-col space-y-2 sm:grid sm:grid-cols-2">
        <HomeScreenCard onClickUrl="/study" title="Study PGN Maker" description="Create PGN tournament results for your Lichess studies" imgSrc={`${process.env.PUBLIC_URL}/assets/home/pgn-results.png`}/>
        <HomeScreenCard disabled={true} onClickUrl="/quiz" title="Openings Quiz" description="How well do you know your openings?" imgSrc={`${process.env.PUBLIC_URL}/assets/home/carokann.gif`}/>
      </div>
    </div>
  );
}

export default Home;
