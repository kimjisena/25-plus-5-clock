import React, {useEffect} from 'react';

function ProgressLine({width}) {

    useEffect(() => {
        // oops, component has mounted
        // determine `linePosition` && `nodePosition`
        let nodePos = '-' + String(10 - (width / 2)) + 'px'; // node position relative to line
        let linePos = String(92 - (width / 2)) + 'px'; // line position relative to clock
        let lineWidth = String(width) +'px';

        // get node and line
        let line = document.getElementById('line');
        let node = document.getElementById('node');

        // modify styles
        line.style.left = linePos;
        line.style.width = lineWidth;
        node.style.left = nodePos;

        // display the magic
        //node.style.backgroundColor = '#C56F17';
        line.style.backgroundColor = '#F73349';
    });

    return (
        <div>
            <div id='line' className={`line absolute h-1/2`}>
                <div id='node' className={`node absolute w-[18.4px] h-5 rounded-full`}></div>
            </div>
        </div>
    );
}

export default ProgressLine;