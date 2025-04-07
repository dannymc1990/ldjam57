import { createProvider } from "difunkt";
import { IScene } from "~/app.types";
import { LevelService } from "~/levels/level";
import { getGameState } from "~/state/state";

export const IdleScene = createProvider<IScene>(({ inject }) => {
    const levels = inject(LevelService)
    return {
        async run() {
	        levels.init(getGameState("currentLevel"));
        }
    }
})