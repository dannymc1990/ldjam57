export interface IGameState {
    state: "idle" | "running" | "over",
    currentLevel: number
}