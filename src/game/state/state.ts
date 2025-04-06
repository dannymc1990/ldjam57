import { IGameState } from "./state.types";

const GameState: IGameState = {
    state: "idle"
}

export function setGameState<T extends keyof IGameState>(key: T, value: IGameState[T]) {
    GameState[key] = value;
}

export function getGameState<T extends keyof IGameState>(key: T): IGameState[T] {
    return GameState[key]
}