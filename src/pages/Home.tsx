import TournamentForm from "../components/TournamentForm";
import useModalContext from "../hooks/useModalContext";

function Home() {

  const modalContext = useModalContext();
  return (
    <div>
        <h1>Home</h1>
        <div className="p-1 space-y-2">
          <button 
            className="bg-blue-400 pill-button"
            onClick={() => {modalContext.openModal(<TournamentForm/>)}}>
              Edit Tournament Details 
          </button>
        </div>
    </div>
  );
}

export default Home;
