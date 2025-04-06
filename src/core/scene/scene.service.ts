import { createProvider, ProviderFactory } from "difunkt";
import { IScene } from "~/app.types";
import { SceneModuleOptions } from "./scene.providers";

export const SceneService = createProvider(({ inject }) => {
    const { scenes } = inject(SceneModuleOptions)
 
    function getNextScene(Scene: ProviderFactory<IScene>): ProviderFactory<IScene> | undefined {
        const conditions = scenes.get(Scene);
        if (conditions) {
            for (const { condition, next } of conditions) {
                if (condition()) {
                    return next;
                }
            }
        }
        return 
    }

    return {
        async run(Scene: ProviderFactory<IScene>) {
            const instance = inject(Scene);
            const NextSceneFactory = getNextScene(Scene)

            await instance.run();

            if (NextSceneFactory) {
                this.run(NextSceneFactory)
            }
        }
    }
})