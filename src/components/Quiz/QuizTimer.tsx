import { useState, useEffect } from "react";
import { BsFlagFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

// time for chess clock, prepend 0 for single digit 
function formatTime(time: number) {
    if (time < 10) {
        return `0${time}`
    }
    return time;
}

function QuizTimer() {
    const MAX_TIME = 60; //seconds
    const [time, setTime] = useState(MAX_TIME); //descends to 0
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
    const [flagVisible, setFlagVisible] = useState(false);
    const flagIcon =
        <IconContext.Provider value={{ color: 'white' }}>
            <BsFlagFill className="inline align-middle" />
        </IconContext.Provider>
    useEffect(() => {
        let id: NodeJS.Timer;

        if (!intervalId) {
            id = setInterval(function () {
                setTime((old) => old - 1);
            }, 1000);
            setIntervalId(id);
        }
        return function cleanup() { clearInterval(id) }
    }, [])

    useEffect(() => {
        let id: NodeJS.Timer;
        if (time <= 0) {
            // stop the timer once reached 0
            clearInterval(intervalId);
            // start an interval for flag icon on clock, reappearing every second
            id = setInterval(function () {
                setFlagVisible((old) => !old)
            }, 1000);
        }
        return function cleanup() { clearInterval(id) }
    }, [time])


    return (
        <div className="flex-1 py-2">
            <div className="w-1/2 bg-[#7E8B78]">
                <h2 className="font-orbitron">{formatTime(time)} {flagVisible && flagIcon}</h2>
            </div>
        </div>

    )
}

export default QuizTimer;
