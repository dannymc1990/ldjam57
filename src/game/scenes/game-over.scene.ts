import { createProvider } from "difunkt";
import { IFlowable } from "~/core/flows/flow.types";
import { IdleScene } from "./idle.scene";

export const GameOverScene = createProvider<IFlowable>(() => {
    return {
        async run(switchScene) {
            console.log("Game over scene running")
            switchScene(IdleScene)
        },
    }
})