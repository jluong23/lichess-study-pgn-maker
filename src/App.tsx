import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import About from "./pages/About";
function App() {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  return (
    <BrowserRouter>
      <Sidebar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible}/>
      <Navbar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible}/>
      <div className="p-1">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
