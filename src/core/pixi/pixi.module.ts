import { createModule, provide } from "difunkt";
import { PixiDevToolsRunnable, PixiRunnable, PixiTweenRunnable } from "./pixi.runnable";
import { IPixiModuleOptions } from "./pixi.types";
import { PixiApplication, PixiModuleOptions } from "./pixi.providers";
import { Application } from "pixi.js";

export const PixiModule = (options: IPixiModuleOptions
) => createModule({
    runnables: [PixiRunnable, PixiDevToolsRunnable, PixiTweenRunnable],
    providers: [
        provide(PixiModuleOptions, {
            value: options
        }),
        provide(PixiApplication, {
            value: new Application()
        })
    ]
})