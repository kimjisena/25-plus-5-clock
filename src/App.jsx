import React, {useState} from 'react';
import GenericLabel from './components/GenericLabel';
import Timer from './components/Timer';


let countId;

function App() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(['25', '00']);
    // const [countId, setCountId] = useState(null);

    // const [minutes, setMinutes] = useState(8);
    // const [seconds, setSeconds] = useState(3);

    const [counting, setCounting] = useState(false);
    const [session, setSession] = useState(true);

    const incrementDuration = (duration) => {
        if (duration === 'break') {
            setBreakLength(breakLength + 1);
        } else {
            setTimeLeft([`${sessionLength + 1}`, '00']);
            setSessionLength(sessionLength + 1);
        }
    };

    const decrementDuration = (duration) => {
        if (duration === 'break') {
            setBreakLength(breakLength - 1);
        } else {
            setTimeLeft([`${sessionLength - 1}`, '00']);
            setSessionLength(sessionLength - 1);
        }
    }

    const handleDurationLength = (event) => {
        let action = event.currentTarget.id;
        let duration = action.split('-')[0];

        switch (action) {
            case 'break-increment': case 'session-increment':
                if ((breakLength < 60 && duration === 'break') || (sessionLength < 60 && duration === 'session')) {
                    incrementDuration(duration);
                    break;
                } else {
                    break;
                }

            case 'break-decrement': case 'session-decrement':
                if ((breakLength > 1 && duration === 'break') || (sessionLength > 1 && duration === 'session')) {
                    decrementDuration(duration);
                    break;
                } else {
                    break;
                }
            default:
                break;
        }
    }

    let mins, secs;
    mins = Number(timeLeft[0]);
    secs = Number(timeLeft[1]);

    const countdown = () => {

        const switchTimer = () => {
            if (session) {
                mins = breakLength;
                secs = 0;
                setSession(false); // oops, time for a break
                setTimeLeft([`${breakLength}`, '00']);
            } else { // get back to session
                setSession(true);
                mins = sessionLength;
                secs = 0;
                setTimeLeft([`${sessionLength}`, '00']);
            }

            // setCounting(true);
            //countId = setInterval(countdown, 1000);
        }

        if (secs > 0) { // we have seconds
            secs--;
            console.log(`Time: ${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`);
            setTimeLeft([`${mins < 10 ? `0${mins}` : mins}`, `${secs < 10 ? `0${secs}` : secs}`]);
        } else {
            if (mins > 0) { // we have minutes
                mins--;
                secs = 59;
                console.log(`Time: ${mins}:${secs}`);
                setTimeLeft([`${mins < 10 ? `0${mins}` : mins}`, `${secs}`]);
            } else {
                console.log(`Time is over: ${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`);
                //clearInterval(countId); // don't call it again
                // setCounting(false); // stop counting
                switchTimer(); // switch between session and break
            }
        }
    };


    const resetLengths = () => {
        setBreakLength(5);
        setSessionLength(25);
    };

    return (
        <div className={`w-full h-[100vh] flex justify-center items-center`}>
            <div className={`wrapper flex flex-col justify-center items-center w-96 h-96 bg-white border-8 border-black rounded-3xl shadow-black shadow-inner`}>
                <div className={`labels-wrapper flex justify-evenly w-full h-1/3`}>
                    <GenericLabel name={`Break`} length={breakLength} clickHandler={handleDurationLength} />
                    <GenericLabel name={`Session`} length={sessionLength} clickHandler={handleDurationLength} />
                </div>
                <div className={`timer-wrapper w-full h-2/3 flex flex-col justify-evenly items-center`}>
                    <Timer sessionLength={sessionLength} breakLength={breakLength} resetLengths={resetLengths} counting={counting} session={session} />
                </div>
            </div>
        </div>
    );
}

export default App;