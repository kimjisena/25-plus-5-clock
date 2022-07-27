import React from 'react';

function Timer() {
  return (
    <>
        {/*timer-label and time-left goes into the clock container */}
        <div id='clock'>
            <div id='timer-label'>Session</div>
            <div id='time-left'>25:00</div>
        </div>

        {/**start_stop and reset goes into the controls container */}
        <div id='controls'>
            <div id='start_stop'></div>
            <div id='reset'></div>
        </div>
    </>
  );
}

export default Timer;