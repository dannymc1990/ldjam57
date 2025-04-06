import { createProvider } from "difunkt";
import { AssetsService } from "./core/assets";
import { ResizerService } from "./core/resizer/resizer.service";

export const AppEntry = createProvider(async ({ inject }) => {
    const assets = inject(AssetsService);
    const resizer = inject(ResizerService);

	resizer.init();
    await assets.loadManifest("./manifest.json");
    await assets.switchBundle("default");

})