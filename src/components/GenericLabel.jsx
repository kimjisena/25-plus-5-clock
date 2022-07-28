import React from 'react';
import {VscTriangleDown} from 'react-icons/vsc';
import {VscTriangleUp} from 'react-icons/vsc';

function GenericLabel ({name, length, clickHandler}) {

    return (
        <div className={`relative w-[45%] h-full flex flex-col justify-evenly items-center`}>
            <div id={`${name.toLowerCase()}-label`} className={`h-[20%] font-bold font-font-one text-lg text-black`}>{`${name} Duration`}</div>

            <div id='value-track' className={`absolute h-[72%] w-[22%] bottom-[3%] bg-green z-0 rounded-md border-[0.5px] border-gray`}></div>

            <div id={`${name.toLowerCase()}-value`} className={`h-[75%] w-full flex flex-col justify-evenly items-center font-font-two text-black text-2xl z-10`}>
                <div id={`${name.toLowerCase()}-prev`} className={`w-8 h-6 flex justify-center items-center border-black border-b-[1px]`}>{length - 1}</div>

                <div id={`${name.toLowerCase()}-current`} className={`flex justify-evenly w-2/3`}>
                    <div id={`${name.toLowerCase()}-increment`} onClick={(ev) => clickHandler(ev)} className={`w-8 h-8 flex justify-center items-center bg-green justify-self-start rounded-md hover:cursor-pointer shadow-black active:shadow-inner shadow-sm`}>
                        <VscTriangleUp className={`text-black`} size={`32px`} />
                    </div>
                    <div id={`${name.toLowerCase()}-length`} className={`w-8 h-8 font-bold flex justify-center items-center`}>{length}</div>
                    <div id={`${name.toLowerCase()}-decrement`} onClick={(ev) => clickHandler(ev)} className={`w-8 h-8 flex justify-center items-center bg-green justify-self-end rounded-md hover:cursor-pointer shadow-black active:shadow-inner shadow-sm`}>
                        <VscTriangleDown className={`text-black`} size={`32px`} />
                    </div>
                </div>

                <div id={`${name.toLowerCase()}-next`} className={`w-8 h-6 flex justify-center items-center border-black border-t-[1px]`}>{length + 1}</div>
            </div>
        </div>
    );
}

export default GenericLabel;