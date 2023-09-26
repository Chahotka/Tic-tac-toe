import { useEffect } from "react";
import TicTac from "./TicTac";
import { socket } from "../socket";
import { FigureProvider } from "../context/FigureContext";
import { TurnProvider } from "../context/TurnContext";
import { RoomProvider } from "../context/RoomContext";
import { PlayerProvider } from "../context/PlayerContext";

function App() {
  useEffect(() => {
    socket.connect()
  }, [])

  return (
    <>
      <PlayerProvider>
        <RoomProvider>
          <FigureProvider>
            <TurnProvider>
              <TicTac />
            </TurnProvider>
          </FigureProvider>
        </RoomProvider>
      </PlayerProvider>
    </>
  )
}

export default App;
