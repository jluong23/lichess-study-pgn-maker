import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import About from "./pages/About";
import Study from "./pages/Study";
import Quiz from "./pages/Quiz";
function App() {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  return (
    <BrowserRouter basename="/lichess-study-pgn-maker">
      <Sidebar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible}/>
      <div className="flex flex-col h-screen">
        <Navbar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible}/>
        <div className="flex flex-1 p-2">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/study" element={<Study/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
          </Routes>

        </div>
      </div>
      {/* <Footer/> */}
    </BrowserRouter>
    
  );
}

export default App;
