import { createModule } from "difunkt";
import { AppEntry } from "./app.entry";
import { PixiModule } from "./core/pixi/pixi.module";
import { provideAssetServices } from "./core/assets";
import { provideLogger } from "./core/logger";
import { PlayerService } from "./game";
import { ResizerService } from "./core/resizer/resizer.service";
import { IdleScene } from "./game/scenes/idle.scene";
import { GameOverScene } from "./game/scenes/game-over.scene";
import { RunningScene } from "./game/scenes/running.scene";
import { SceneManagerService } from "./game/scenes/scene-manager.service";

export const AppModule = createModule({
    runnables: [AppEntry],
    imports: [
        PixiModule({
            mountTo: document.getElementById("app")!,
            application: {
                width: 320,
                height: 180,
                antialias: true
            }
        }),
    ],
    providers: [
        provideLogger("idjam57"),
        provideAssetServices(),
        // Services
        PlayerService,
		ResizerService,
        // Scenes
        SceneManagerService,
        IdleScene,
        GameOverScene,
        RunningScene
    ]
})