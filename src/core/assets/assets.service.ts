import { createProvider } from "difunkt";
import { Assets } from "pixi.js";

export const AssetsService = createProvider(() => {
    
    return {
        async loadManifest(url: string) {
            try {
                const response = await fetch(url);
                const manifest = await response.json();

                await Assets.init({ manifest });
                
                console.log("Succesfully loaded", url)

            } catch (e: any) {
                console.log(`Could not load manifest ${url}`, e)
            }
        },
        async getBundle(name = "default") {
            return await Assets.loadBundle(name)
        }
    }
})