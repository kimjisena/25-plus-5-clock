import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';
import ProgressLine from './ProgressLine';
import {VscDebugPause} from 'react-icons/vsc';
import {VscDebugStart} from 'react-icons/vsc';
import {VscDebugRestart} from 'react-icons/vsc';

const  clockify = (counter) => {
    let minutes = Math.floor(counter / 60);
    let seconds = counter - (minutes * 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
};

function Timer({ state, dispatch }) {
    const [isCounting, setIsCounting] = useState(false);
    const [degree, setDegree] = useState(0);
    const [speed, setSpeed] = useState(360 / state.counter);

    useEffect(() => {
        let audio = document.getElementById('beep');
        audio.volume = 0.5;

        let clock = document.getElementById('clock');
        clock.style.backgroundColor = '#01D86D';

        // restore progress line
        let progress = document.getElementById('moving-line');
        progress.style.transform = `rotate(0deg)`;

        setSpeed(360 / state.counter);
        setDegree(0);
    }, [state.active, state.session, state.break]);

    const countdown = () => {
        if (state.counter < 61) {
            let clock = document.getElementById('clock');
            clock.style.backgroundColor = '#F73349';
        }

        if (state.counter > 0) {
            dispatch({type: 'counter-decrement'});
        } else {
            let audio = document.getElementById('beep');
            audio.currentTime = 0;
            audio.play();
            dispatch({type: 'flip'});
        }
    };

    const rotate = () => {
        let progress = document.getElementById('moving-line');
        progress.style.transform = `rotate(-${degree}deg)`;
        setDegree(degree + speed);
    }

    useInterval(() => {
        countdown();
        rotate();
    }, isCounting ? 1000 : null);


    const handleStartStop = () => {
        if (isCounting) {
            // stop the beep
            let audio = document.getElementById('beep');
            audio.pause();

            setIsCounting(false);
            dispatch({type: 'disable', payload: false});
        } else {
            setIsCounting(true);
            dispatch({type: 'disable', payload: true});
        }
    };

    const handleReset = () => {
        // stop the beep
        let audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;

        // restore progress line
        let progress = document.getElementById('moving-line');
        progress.style.transform = `rotate(0deg)`;

        setDegree(0);
        setIsCounting(false);
        dispatch({type: 'reset'});
        dispatch({type: 'disable', payload: false});
    };

  return (
    <>
        {/*timer-label and time-left goes into the clock container */}
        <div id='clock' className={`relative w-[50%] flex flex-col items-center h-[75%] bg-green rounded-full`}>
            {/**the line to indicate progress */}
            <ProgressLine width={1.75} />

            <div id='clock-inner' className={`absolute top-[10%] w-[80%] h-[80%] bg-white rounded-full`}></div>

            <div id='clock-labels' className={`absolute bottom-[30%] flex flex-col items-center w-[70%] h-[40%%] text-black`}>
                <div id='timer-label' className={`text-xl font-font-one font-bold`}>{state.active}</div>
                <div id='time-left' className={`text-5xl font-font-two font-bold`}>{clockify(state.counter)}</div>
            </div>
        </div>

        {/**start_stop and reset goes into the controls container */}
        <div id='controls' className={`w-[40%] h-[20%] flex justify-evenly items-center`}>

            <div id='start_stop' onClick={() => handleStartStop()} className={`w-8 h-8 flex justify-center items-center bg-green rounded-md hover:cursor-pointer shadow-black active:shadow-inner shadow-sm`}>
                {isCounting ? <VscDebugPause className={`text-black`}  size={`24px`} /> : <VscDebugStart className={`text-black`}  size={`24px`} />}
            </div>

            <div id='reset' onClick={() => handleReset()} className={`w-8 h-8 flex justify-center items-center bg-green rounded-md hover:cursor-pointer shadow-black active:shadow-inner shadow-sm`}>
                <VscDebugRestart className={`text-black`}  size={`24px`} />
            </div>
        </div>
        <audio id='beep' preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </>
  );
}

export default Timer;