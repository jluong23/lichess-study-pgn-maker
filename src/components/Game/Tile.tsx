import { useEffect, useState } from "react";
import { Piece } from "./ChessBoard";

interface TileProps {
  x: number
  y: number
  piece?: Piece
}
function Tile({x,y,piece}:TileProps) {
    const whiteSquareClass = "bg-stone-200";
    const darkSquareClass = "bg-green-700";
    const colorClass = (x+y) % 2 == 0 ? whiteSquareClass : darkSquareClass;
    const pieceStyle = {backgroundImage: `url("${process.env.PUBLIC_URL}/assets/pieces/${piece?.type}_${piece?.color}.png")`}
    return (
      <span className={`grid ${colorClass}`}>
        {piece &&
          <div style={pieceStyle} className="bg-no-repeat bg-center bg-contain hover:cursor-pointer active:cursor-grabbing">
            {/* the piece is in the background of this div */}

          </div>
        }
      </span>
    );
  }
  
  export default Tile;
  