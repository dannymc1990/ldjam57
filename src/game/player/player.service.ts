import { createProvider } from "difunkt";
import { PixiApplication } from "~/core/pixi";

export const PlayerService = createProvider(({ inject }) => {
    const app = inject(PixiApplication);


    return {
        
    }
})