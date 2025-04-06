import { createProvider } from "difunkt";
import { PixiApplication } from "~/core/pixi";

export const PlayerService = createProvider(({ inject }) => {
    const app = inject(PixiApplication);

    const ticker = app.ticker.add(onUpdate)

    function onUpdate() {

    }

    return {
        spawn() {
            ticker.start();
        },
        kill() {
            ticker.stop();
        }
    }
})