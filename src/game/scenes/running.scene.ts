import { createProvider } from "difunkt";
import { IFlowable } from "~/core/flows/flow.types";
import { GameOverScene } from "./game-over.scene";

export const RunningScene = createProvider<IFlowable>(() => {
    return {
        async run(switchScene) {
            console.log("Running scene running");
            switchScene(GameOverScene)
        },
       
    }
})