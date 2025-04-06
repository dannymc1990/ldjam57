import { createProvider } from "difunkt";
import { Assets, Sprite, Spritesheet } from "pixi.js";
import { LoggerService } from "../logger/logger.service";

export const AssetsService = createProvider(({ inject }) => {
    const logger = inject(LoggerService);
    let currenBundle: Record<string, Spritesheet> | null = null;

    return {
        async loadManifest(url: string) {
            try {
                const response = await fetch(url);
                const manifest = await response.json();

                await Assets.init({ manifest });
                
                logger.info("Succesfully loaded", url)

            } catch (e: any) {
                logger.info(`Could not load manifest ${url}`, e)
            }
        },
        async switchBundle(name: string) {
            currenBundle = await Assets.loadBundle(name);
            logger.info("Using bundle", name)
        },
        from(spriteSheet: string) {

            if (!currenBundle) {
                throw new Error(`No active bundle. Use switchBundle(<bundle_name>)`)
            }

            return {
                getSprite(spriteName: string) {
                    return new Sprite(currenBundle?.[spriteSheet].textures[spriteName])
                }
            }
        }

    }
})