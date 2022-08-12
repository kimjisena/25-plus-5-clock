import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';
import ProgressLine from './ProgressLine';
import {VscDebugPause} from 'react-icons/vsc';
import {VscDebugStart} from 'react-icons/vsc';
import {VscDebugRestart} from 'react-icons/vsc';

function Timer({ lengthLabel, resetLengths, flipTimer, disableLengthSetters, label }) {
    const [time, setTime] = useState(lengthLabel);
    const [isCounting, setIsCounting] = useState(false);
    const [degree, setDegree] = useState(0);
    const [speed, setSpeed] = useState(360 / lengthLabel);

    useEffect(() => {
        let audio = document.getElementById('beep');
        audio.volume = 0.4;

        let clock = document.getElementById('clock');
        clock.style.backgroundColor = '#01D86D';

        setTime(lengthLabel);
        setSpeed(360 / lengthLabel);
    }, [lengthLabel, label]);

    const countdown = () => {
        if (time > 0) {
            if (time === 49) {
                let audio = document.getElementById('beep');
                audio.play();

                let clock = document.getElementById('clock');
                clock.style.backgroundColor = '#F73349';
            }
            setTime(time - 1);
        } else {
            flipTimer();
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
            if (time < 49) {
                let audio = document.getElementById('beep');
                audio.pause();
            }
            setIsCounting(false);
            disableLengthSetters(false);
        } else {
            // play the beep
            if (time < 49) {
                let audio = document.getElementById('beep');
                audio.play();
            }
            setIsCounting(true);
            disableLengthSetters(true);
        }
    };

    const handleReset = () => {
        // stop the beep
        if (time < 49) {
            let audio = document.getElementById('beep');
            audio.pause();
            audio.currentTime = 0;
        }
        // restore progress line
        let progress = document.getElementById('moving-line');
        progress.style.transform = `rotate(0deg)`;

        setDegree(360 / lengthLabel);
        setIsCounting(false);
        setTime(lengthLabel);
        resetLengths();
        disableLengthSetters(false);
    };

    const  clockify = () => {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
      }

  return (
    <>
        {/*timer-label and time-left goes into the clock container */}
        <div id='clock' className={`relative w-[50%] flex flex-col items-center h-[75%] bg-green rounded-full`}>
            {/**the line to indicate progress */}
            <ProgressLine width={1.75} />

            <div id='clock-inner' className={`absolute top-[10%] w-[80%] h-[80%] bg-white rounded-full`}></div>

            <div id='clock-labels' className={`absolute bottom-[30%] flex flex-col items-center w-[70%] h-[40%%] text-black`}>
                <div id='timer-label' className={`text-xl font-font-one font-bold`}>{label}</div>
                <div id='time-left' className={`text-5xl font-font-two font-bold`}>{clockify()}</div>
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
        <audio id='beep' src='/audios/beep.mp3' />
    </>
  );
}

export default Timer;