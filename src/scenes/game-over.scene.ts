import { createProvider } from "difunkt";
import { IScene } from "~/app.types";

export const GameOverScene = createProvider<IScene>(() => {
    return {
        async run() {
            console.log("Game over scene running")
        },
    }
})