import { createProvider } from "difunkt";
import { AssetsService } from "./core/assets";
import { ResizerService } from "./core/resizer/resizer.service";
import { SceneService } from "./core/scene/scene.service";
import { SceneModuleOptions } from "./core/scene/scene.providers";

export const AppEntry = createProvider(async ({ inject }) => {
    const assets = inject(AssetsService);
    const resizer = inject(ResizerService);
    const scene = inject(SceneService);
    const { defaultScene } = inject(SceneModuleOptions)

	resizer.init();
    
    await assets.loadManifest("./manifest.json");
    await assets.switchBundle("default");

    scene.run(defaultScene);
})