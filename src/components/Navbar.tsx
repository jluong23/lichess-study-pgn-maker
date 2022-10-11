import {  Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

interface NavbarProps {
  sideBarVisible: boolean
  setSideBarVisible: (input: boolean) => void
}

function Navbar({sideBarVisible,setSideBarVisible} : NavbarProps) {
  return (
    <nav className="flex p-1 bg-primary items-center space-x-1">
      <span className="text-lg cursor-pointer" onClick={() => {setSideBarVisible(!sideBarVisible)}}>
        <GiHamburgerMenu/>
      </span>
      <Link to="/">
        <h1 className="font-bold">Lichess Study PGN Maker</h1>
      </Link>
    </nav>
  );
}

export default Navbar;
