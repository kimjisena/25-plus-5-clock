import React from 'react';

function GenericLabel ({name, length}) {
    return (
        <div className={`w-full h-1/2 flex flex-col items-center`}>
            <div id={`${name.toLowerCase()}-label`}>{`${name} Duration`}</div>
            <div id={`${name.toLowerCase()}-value`}>
                <div id={`${name.toLowerCase()}-increment`}></div>
                
                <div id={`${name.toLowerCase()}-prev`}>{length - 1}</div>
                <div id={`${name.toLowerCase()}-length`}>{length}</div>
                <div id={`${name.toLowerCase()}-next`}>{length + 1}</div>
                
                <div id={`${name.toLowerCase()}-decrement`}></div>
            </div>
        </div>
    );
}

export default GenericLabel;