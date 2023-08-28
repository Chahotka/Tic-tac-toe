import FigureProvider from "../context/FigureContext";
import TicTac from "./TicTac";


function App() {
  return (
    <>
      <FigureProvider>
        <TicTac />
      </FigureProvider>
    </>
  )
}

export default App;
