import { useEffect } from "react";
import FigureProvider from "../context/FigureContext";
import TicTac from "./TicTac";
import { socket } from "../socket";


function App() {
  useEffect(() => {
    socket.connect()
  }, [])

  return (
    <>
      <FigureProvider>
        <TicTac />
      </FigureProvider>
    </>
  )
}

export default App;
