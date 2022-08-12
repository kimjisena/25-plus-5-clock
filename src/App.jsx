import React, {useState} from 'react';
import GenericLabel from './components/GenericLabel';
import Timer from './components/Timer';

function App() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [session, setSession] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    const incrementDuration = (duration) => {
        if (duration === 'break') {
            setBreakLength(breakLength + 1);
        } else {
            setSessionLength(sessionLength + 1);
        }
    };

    const decrementDuration = (duration) => {
        if (duration === 'break') {
            setBreakLength(breakLength - 1);
        } else {
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

    const resetLengths = () => {
        setBreakLength(5);
        setSessionLength(25);
        setSession(true);
    };

    const flipTimer = () => {
        setSession(!session);
    }

    const handleLengthSetters = (signal) => {
        setIsDisabled(signal);
    }

    return (
        <div className={`w-full h-[100vh] flex justify-center items-center`}>
            <div className={`wrapper flex flex-col justify-center items-center w-96 h-96 bg-white border-8 border-black rounded-3xl shadow-black shadow-inner`}>
                <div className={`labels-wrapper flex justify-evenly w-full h-1/3`}>
                    <GenericLabel name={`Break`} length={breakLength} clickHandler={isDisabled ? () => null :  handleDurationLength} />
                    <GenericLabel name={`Session`} length={sessionLength} clickHandler={isDisabled ? () => null : handleDurationLength} />
                </div>
                <div className={`timer-wrapper w-full h-2/3 flex flex-col justify-evenly items-center`}>
                    <Timer lengthLabel={ session ? (sessionLength * 60) : (breakLength * 60) } resetLengths={resetLengths} flipTimer={flipTimer} disableLengthSetters={handleLengthSetters} label={session ? 'Session': 'Break'} />
                </div>
            </div>
        </div>
    );
}

export default App;