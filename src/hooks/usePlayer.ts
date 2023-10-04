import { useFigureContext } from "../context/FigureContext"
import { useRoomContext } from "../context/RoomContext"
import { useTurnContext } from "../context/TurnContext"


const usePlayer = () => {
  const { roomName } = useRoomContext()
  const { turn, setTurn } = useTurnContext()
  const { figure, setFigure } = useFigureContext()

  const updatePlayer = () => {
    if (!roomName) {
      figure === 'x' ? setFigure('o') : setFigure('x')
    }
    turn === 'x' ? setTurn('o') : setTurn('x')
  }

  return { updatePlayer }
}

export default usePlayer