import GenericLabel from './components/GenericLabel';
function App() {
  return (
    <div className={`text-center`}>
        <div className={`wrapper`}>
            <div className={`labels-wrapper`}>
                <GenericLabel name={`Break`} length={5} />
                <GenericLabel name={`Session`} length={25} />
            </div>
            <div className={`timer-wrapper`}>
                timer
            </div>
        </div>
    </div>
  );
}

export default App;