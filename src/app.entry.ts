import { createProvider } from "difunkt";
import { AssetsService } from "./core/assets";
import { ResizerService } from "./core/resizer/resizer.service";
import { SceneService } from "./core/scene/scene.service";
import { SceneModuleOptions } from "./core/scene/scene.providers";
import { KeyboardService } from "./core/keyboard/keyboard.service";
import { sound } from "@pixi/sound";

export const AppEntry = createProvider(async ({ inject }) => {
    const assets = inject(AssetsService);
    const resizer = inject(ResizerService);
    const scene = inject(SceneService);
    const keyboard = inject(KeyboardService)
    const { defaultScene } = inject(SceneModuleOptions)

    keyboard.init();
	resizer.init();
    
    await assets.loadManifest("./manifest.json");
    await assets.switchBundle("default");

	sound.play('music', {loop: true, volume: 0.25});

    scene.run(defaultScene);
})