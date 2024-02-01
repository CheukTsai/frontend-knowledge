import {useRef, useEffect, useState} from 'react';

export default function CountDown() {
    const [inputValue, setInputValue] = useState("");

    const ref = useRef(null);

    const [timer, setTimer] = useState("00:00");

    function handleClick() {
        if (ref.current) clearInterval(ref.current)
        setInputValue("");
        let remainingTime = inputValue;
        let interval = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(interval);
                ref.current = null;
            } else {
                remainingTime--;
                setTimer(transformRemaingTime(remainingTime));
            }
            
        }, 1000);

        ref.current = interval;

    }

    function transformRemaingTime(remainingTime) {
        let min = Math.floor(remainingTime / 60);
        let sec = remainingTime - 60 * min;
        return min + ":" + sec;
    }

    return (
        <div>
            <h1>CountDown: {timer}</h1>
            <input 
                type="text"
                value={inputValue}
                onChange={e => setInputValue(parseInt(e.target.value))}
            />
            <button onClick={handleClick}> Submit </button>
            
        </div>
    );

    // const Ref = useRef(null);
 
    // // The state for our timer
    // const [timer, setTimer] = useState('00:00:00');
 
    // const getTimeRemaining = (e) => {
    //     const total = Date.parse(e) - Date.parse(new Date());
    //     const seconds = Math.floor((total / 1000) % 60);
    //     const minutes = Math.floor((total / 1000 / 60) % 60);
    //     const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    //     return {
    //         total, hours, minutes, seconds
    //     };
    // }
 
    // const startTimer = (e) => {
    //     let { total, hours, minutes, seconds }
    //                 = getTimeRemaining(e);
    //     if (total >= 0) {
 
    //         // update the timer
    //         // check if less than 10 then we need to
    //         // add '0' at the beginning of the variable
    //         setTimer(
    //             (hours > 9 ? hours : '0' + hours) + ':' +
    //             (minutes > 9 ? minutes : '0' + minutes) + ':'
    //             + (seconds > 9 ? seconds : '0' + seconds)
    //         )
    //     }
    // }
 
    // const clearTimer = (e) => {
 
    //     // If you adjust it you should also need to
    //     // adjust the Endtime formula we are about
    //     // to code next   
    //     setTimer('00:00:10');
 
    //     // If you try to remove this line the
    //     // updating of timer Variable will be
    //     // after 1000ms or 1sec
    //     if (Ref.current) clearInterval(Ref.current);
    //     const id = setInterval(() => {
    //         startTimer(e);
    //     }, 1000)
    //     Ref.current = id;
    // }
 
    // const getDeadTime = () => {
    //     let deadline = new Date();
 
    //     // This is where you need to adjust if
    //     // you entend to add more time
    //     deadline.setSeconds(deadline.getSeconds() + 10);
    //     return deadline;
    // }
 
    // // We can use useEffect so that when the component
    // // mount the timer will start as soon as possible
 
    // // We put empty array to act as componentDid
    // // mount only
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);
 
    // // Another way to call the clearTimer() to start
    // // the countdown is via action event from the
    // // button first we create function to be called
    // // by the button
    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // }
 
    // return (
    //     <div >
    //         <h2>{timer}</h2>
    //         <button onClick={onClickReset}>Reset</button>
    //     </div>
    // )
}