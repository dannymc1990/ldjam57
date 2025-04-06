import { ProviderFactory } from "difunkt";
import { IScene } from "~/app.types";

export interface SceneConditions {
    next: ProviderFactory<IScene>,
    condition: () => boolean
}

export interface ISceneModuleOptions {
    defaultScene: ProviderFactory<IScene>
    scenes: Map<ProviderFactory<IScene>, SceneConditions[]>;
}