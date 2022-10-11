import { useState } from "react";

function TournamentForm() {

    const DEFAULT_ELO = 1500;
    const [name, setName] = useState("");
    const [elo, setElo] = useState(DEFAULT_ELO);
    const formSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(name, elo);
    }

    return (
      <form className="flex flex-col items-start space-y-1 [&>input]:border-2" onSubmit={formSubmit}>
        <h2>Personal Details</h2>
        <hr className="h-1 w-full"/>
        <label htmlFor="name">Name: </label>
        <input className="" name="name" defaultValue={name} onChange={(e) => {setName(e.target.value)}} required/>
        <label htmlFor="elo">FIDE ELO: </label>
        <input type={"number"} defaultValue={elo} name="elo" onChange={(e) => {setElo(parseInt(e.target.value))}} required/>
        <h2>Rounds</h2>
        <hr className="h-1 w-full"/>

          <input className="pill-button bg-red-400" type="submit" required/>

      </form>
    );
  }
  
  export default TournamentForm;
  