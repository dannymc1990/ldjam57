import { createProvider } from "difunkt";
import { PixiApplication } from "~/core/pixi";

export const PlayerService = createProvider(({ inject }) => {
    const app = inject(PixiApplication);


    return {
        test() {
            const ticker = app.ticker.add(() => {
                console.log("Player is moving")
            })
        
        }
    }
})