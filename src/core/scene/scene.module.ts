import { createModule, provide } from "difunkt";
import { ISceneModuleOptions } from "./scene.types";
import { SceneModuleOptions } from "./scene.providers";
import { SceneService } from "./scene.service";

export const SceneModule = (options: ISceneModuleOptions) => {

    const sceneProviders = Array.from(options.scenes.keys());

    return createModule({
        providers: [
            provide(SceneModuleOptions, { value: options }),
            SceneService,
            ...sceneProviders
        ]
    })
}