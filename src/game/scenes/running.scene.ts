import { createProvider } from "difunkt";
import { IScene } from "~/app.types";

export const RunningScene = createProvider<IScene>(() => {
    return {
        async run() {
            console.log("Running scene running");
        }
    }
})