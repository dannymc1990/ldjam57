import { createModule } from "difunkt";
import { AppRunnable } from "./app.entry";
import { PixiModule } from "./core/pixi/pixi.module";

export const AppModule = createModule({
    runnables: [AppRunnable],
    imports: [
        PixiModule({
            mountTo: document.getElementById("app")!,
            application: {
                width: 320,
                height: 180,
                antialias: true
            }
        })
    ]
})