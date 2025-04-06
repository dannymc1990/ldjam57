import { createProvider } from "difunkt";
import { AssetsService } from "./core/assets";
import { PixiApplication } from "./core/pixi";
import { Sprite } from "pixi.js";

export const AppEntry = createProvider(async ({ inject }) => {
    const assets = inject(AssetsService);
    const app = inject(PixiApplication);

    await assets.loadManifest("./public/manifest.json");

    const defaultBundle = await assets.getBundle();
    const torch = new Sprite(defaultBundle['default/sprites/player'].textures['player_idle_up.png'])
    console.log(defaultBundle)

    app.stage.addChild(torch)
})