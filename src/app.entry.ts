import { createProvider } from "difunkt";
import { AssetsService } from "./core/assets";

export const AppEntry = createProvider(async ({ inject }) => {
    const assets = inject(AssetsService);
    await assets.loadManifest("./manifest.json");
    await assets.switchBundle("default");
})