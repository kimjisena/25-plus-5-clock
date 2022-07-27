import GenericLabel from './components/GenericLabel';
import Timer from './components/Timer';


function App() {
  return (
    <div className={`w-full h-[100vh] flex justify-center items-center`}>
        <div className={`wrapper flex flex-col justify-center items-center w-96 h-96 bg-white border-8 border-black rounded-3xl shadow-black shadow-inner`}>
            <div className={`labels-wrapper flex justify-evenly w-full h-1/3`}>
                <GenericLabel name={`Break`} length={5} />
                <GenericLabel name={`Session`} length={25} />
            </div>
            <div className={`timer-wrapper w-full h-2/3 flex flex-col justify-evenly items-center`}>
                <Timer />
            </div>
        </div>
    </div>
  );
}

export default App;