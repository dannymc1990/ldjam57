import { createProvider } from "difunkt";
import { IFlowable } from "~/core/flows/flow.types";
import { RunningScene } from "./running.scene";

export const IdleScene = createProvider<IFlowable>(() => {
    return {
        async run(switchScene) {
            console.log("Idle scene running");
            switchScene(RunningScene)
        }
    }
})