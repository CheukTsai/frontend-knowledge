import {useRef, useState} from 'react'

export default function CountDown() {

    const [countDown, setCountDown] = useState("0:0");
    const [input, setInput] = useState("");
    const interval = useRef(null);

    function handleClick() {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }

        if (!input) return;

        manageCountDown(input);
        setInput("");
        
    }

    function manageCountDown(seconds) {
        seconds++;
        interval.current = setInterval(() => {
            if (seconds <= 0) {
                clearInterval(interval.current);
                interval.current = null;
                return;
            }
            seconds--;
            let min = Math.floor(seconds / 60);
            let sec = seconds - min * 60;
            setCountDown(min + ":" + sec);
        }, 1000)
    }

    return (<>
        <h2>{countDown}</h2>
        <br/>
        <input value={input} onChange={e => setInput(parseInt(e.target.value))}></input>
        <button onClick={handleClick}>submit</button>
    </>)
}