import { createProvider } from "difunkt";
import { PixiApplication, PixiModuleOptions } from "./pixi.providers";
import { initDevtools } from "@pixi/devtools"
import gsap from "gsap";

export const PixiRunnable = createProvider(async ({ inject }) => {
    const app = inject(PixiApplication);
    const { application, mountTo } = inject(PixiModuleOptions)

    await app.init(application)

    mountTo.appendChild(app.canvas)
})

export const PixiDevToolsRunnable = createProvider(({ inject }) => {
    const app = inject(PixiApplication);
    initDevtools({ app })
    window.__PIXI_APP__ = app;
})

export const PixiTweenRunnable = createProvider(({ inject }) => {
    const app = inject(PixiApplication);
	app.ticker.stop();
	gsap.ticker.add(() => {
		app.ticker.update();
	});
})