import {  Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

interface NavbarProps {
  sideBarVisible: boolean
  setSideBarVisible: (input: boolean) => void
}

function Navbar({sideBarVisible,setSideBarVisible} : NavbarProps) {
  return (
    <nav className="flex p-1 items-center space-x-2">
      <span className="text-lg cursor-pointer" onClick={() => {setSideBarVisible(!sideBarVisible)}}>
        <GiHamburgerMenu/>
      </span>
      <Link to="/">
        <h2 className="font-bold">Lichess Study PGN Maker</h2>
      </Link>
    </nav>
  );
}

export default Navbar;
