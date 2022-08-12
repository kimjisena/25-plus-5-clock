import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';
import ProgressLine from './ProgressLine';
import {VscDebugPause} from 'react-icons/vsc';
import {VscDebugStart} from 'react-icons/vsc';
import {VscDebugRestart} from 'react-icons/vsc';

function Timer({ lengthLabel, resetLengths, flipTimer, label }) {
    const [mins, setMins] = useState(lengthLabel);
    const [secs, setSecs] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        setMins(lengthLabel);
        setSecs(0);
    }, [lengthLabel, label]);

    const countdown = () => {
        if (secs > 0) {
            // we have seconds
            setSecs(s => {
                return (s - 1);
            });
        } else {
            if (mins > 0) {
                // we have minutes but no seconds
                setSecs(59);
    
                // update minutes count
                setMins(m => {
                    return (m - 1);
                });
            } else {
                flipTimer();
                // setIsCounting(false);
            }
        }
    };

    useInterval(() => {
        countdown();
    }, isCounting ? 1000 : null);


    const handleStartStop = (event) => {
        let control = event.currentTarget.id;
        if (control === 'start_stop') {
            setIsCounting(!isCounting);
        }
    };

    const handleReset = (event) => {
        let control = event.currentTarget.id;
        if (control === 'reset') {
            setIsCounting(false);
            setMins(lengthLabel);
            setSecs(0);
            resetLengths();
        }
    };



  return (
    <>
        {/*timer-label and time-left goes into the clock container */}
        <div id='clock' className={`relative w-[50%] flex flex-col items-center h-[75%] bg-green rounded-full`}>
            {/**the line to indicate progress */}
            <ProgressLine width={1.75} />

            <div id='clock-inner' className={`absolute top-[10%] w-[80%] h-[80%] bg-white rounded-full`}></div>

            <div id='clock-labels' className={`absolute bottom-[30%] flex flex-col items-center w-[70%] h-[40%%] text-black`}>
                <div id='timer-label' className={`text-xl font-font-one font-bold`}>{label}</div>
                <div id='time-left' className={`text-5xl font-font-two font-bold`}>{ mins < 10 ? `0${mins}` : `${mins}`}:{ secs < 10 ? `0${secs}` : `${secs}` }</div>
            </div>
        </div>

        {/**start_stop and reset goes into the controls container */}
        <div id='controls' className={`w-[40%] h-[20%] flex justify-evenly items-center`}>

            <div id='start_stop' onClick={(ev) => handleStartStop(ev)} className={`w-8 h-8 flex justify-center items-center bg-green rounded-md hover:cursor-pointer shadow-black active:shadow-inner shadow-sm`}>
                {isCounting ? <VscDebugPause className={`text-black`}  size={`24px`} /> : <VscDebugStart className={`text-black`}  size={`24px`} />}
            </div>

            <div id='reset' onClick={(ev) => handleReset(ev)} className={`w-8 h-8 flex justify-center items-center bg-green rounded-md hover:cursor-pointer shadow-black active:shadow-inner shadow-sm`}>
                <VscDebugRestart className={`text-black`}  size={`24px`} />
            </div>
        </div>
    </>
  );
}

export default Timer;