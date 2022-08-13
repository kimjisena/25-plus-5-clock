import React, {useReducer} from 'react';
import GenericLabel from './components/GenericLabel';
import Timer from './components/Timer';
import reducer from './lib/reducer';

function init (initState) {
    return { ...initState };
}

function App({ initState }) {
    const [state, dispatch] = useReducer(reducer, initState, init);

    return (
        <div className={`w-full h-[100vh] flex justify-center items-center`}>
            <div className={`wrapper flex flex-col justify-center items-center w-96 h-96 bg-white border-8 border-black rounded-3xl shadow-black shadow-inner`}>
                <div className={`labels-wrapper flex justify-evenly w-full h-1/3`}>
                    <GenericLabel state={state} name={`Break`} length={state.break / 60} dispatch={state.disabled ? () => null :  dispatch} />
                    <GenericLabel state={state} name={`Session`} length={state.session / 60} dispatch={state.disabled ? () => null : dispatch} />
                </div>
                <div className={`timer-wrapper w-full h-2/3 flex flex-col justify-evenly items-center`}>
                    <Timer dispatch={dispatch} state={state} />
                </div>
            </div>
        </div>
    );
}

export default App;