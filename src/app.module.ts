import { createModule } from "difunkt";
import { AppEntry } from "./app.entry";
import { PixiModule } from "./core/pixi/pixi.module";
import { provideAssetServices } from "./core/assets";
import { provideLogger } from "./core/logger";
import { ResizerService } from "./core/resizer/resizer.service";
import { SceneModule } from "./core/scene/scene.module";
import { LevelService } from "./levels/level";
import { GameOverScene } from "./scenes/game-over.scene";
import { IdleScene } from "./scenes/idle.scene";
import { RunningScene } from "./scenes/running.scene";
import { KeyboardService } from "./core/keyboard/keyboard.service";

export const AppModule = createModule({
    runnables: [AppEntry],
    imports: [
        PixiModule({
            mountTo: document.getElementById("app")!,
            application: {
                width: 320,
                height: 180,
				// set to false for pixel-art games to have crisp-edges
                antialias: false,
            }
        }),
        SceneModule({
            defaultScene: IdleScene,
            scenes: new Map([
                [IdleScene, [{ next: RunningScene, condition: () => false }]],
                [RunningScene, [{ next: GameOverScene, condition: () => true }]],
                [GameOverScene, [{ next: IdleScene, condition: () => true }]],
            ])
        })
    ],
    providers: [
        provideLogger("idjam57"),
        provideAssetServices(),
        // Services
        KeyboardService,
		ResizerService,
		LevelService
    ]
})