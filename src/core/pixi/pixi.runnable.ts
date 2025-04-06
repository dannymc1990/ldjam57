import { createProvider } from "difunkt";
import { PixiApplication, PixiModuleOptions } from "./pixi.providers";

export const PixiRunnable = createProvider(async ({ inject }) => {
    const app = inject(PixiApplication);
    const { application, mountTo } = inject(PixiModuleOptions)

    await app.init(application)

    mountTo.appendChild(app.view)
})