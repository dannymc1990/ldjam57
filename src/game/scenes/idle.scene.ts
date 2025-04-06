import { createProvider } from "difunkt";
import { IScene } from "~/app.types";

export const IdleScene = createProvider<IScene>(() => {
    return {
        async run() {
            console.log("Idle scene running");
        }
    }
})