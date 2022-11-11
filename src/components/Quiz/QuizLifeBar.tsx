import {BsHeart, BsHeartFill} from "react-icons/bs";
import { IconContext } from "react-icons/lib";

interface Props{
    maxLives: number
    currentLife: number
}

function QuizLifeBar({maxLives, currentLife} : Props) {
    const heartElements = []
    for (let i = 0; i < maxLives; i++) {
        if(i >= currentLife){
            // push empty hearts after i has passed current life
            heartElements.push(
                <BsHeart key={i}/>
            );
        }
        else{
            // pushed filled hearts
            heartElements.push(
                <IconContext.Provider key={i} value ={{color: 'red'}}>
                    <BsHeartFill key={i}/>
                </IconContext.Provider>
            );
        }
    }    
    return(
        <span className="flex space-x-1 items-center text-3xl">
            {heartElements.map((h) => {return h})}
            
        </span>

    )
}

export default QuizLifeBar;
