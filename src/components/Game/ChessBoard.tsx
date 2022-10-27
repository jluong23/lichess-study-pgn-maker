import { useEffect, useState } from "react";
import useModalContext from "../../hooks/useModalContext";
import Tile from "./Tile";

export interface Piece {
  x: number
  y: number
  type: string
  color: string
}


function ChessBoard() {
    const modalContext = useModalContext();
    const onBoardClick = () => {
      // TODO: 
      modalContext.openModal(<div>Board editor under construction, please check again soon!</div>)

    }

    const getPieceName = (x:number) => {
      // get piece name from indexes of x of the board
        switch (x) {
          case 0: case 7: return 'rook'
          case 1: case 6: return 'knight'
          case 2: case 5: return 'bishop'
          case 3: return 'queen'
          case 4: return 'king'
        }
        return '';
    }

    const createPiecesArray = () => {
      let pieces:Piece[] = [];
      for (let i = 0; i < 2; i++) {

        // loop over white pieces, then black
        let color = i == 0 ? 'w' : 'b'

        // add backrank pieces
        let y = color == 'w' ? 7 : 0; // y for backrank pieces
        for (let x = 0; x < 8; x++) {
          pieces.push({type: getPieceName(x), color, x, y})
        }
  
        // add pawns
        for (let x = 0; x < 8; x++) {
          y = color == 'w' ? 6 : 1; //y for pawn rank
          pieces.push({type: 'pawn', color, x, y})
        }
      }
      return pieces;
    }

    let board:any[] = [];
    let pieces:Piece[] = createPiecesArray();

    for(let y=0; y<8; y++){
      for (let x=0; x<8; x++) {
          const coordinate = `${String.fromCharCode('a'.charCodeAt(0)+x)}${8-y}`; 
          let piece;
          pieces.forEach(p => {
            if(p.x == x && p.y == y){
              piece = p;
            }
          })
          board.push(<Tile key={coordinate} x={x} y={y} piece={piece}/>);
        }
      }    
    return (
      <div className="grid w-[20em] h-[20em] grid-cols-8" onClick={onBoardClick}>
        {board}
      </div>
    );
  }
  
  export default ChessBoard;
  