import { createProvider } from "difunkt";
import { IKeyboardService, KeyHandler } from "./keyboard.types";

export const KeyboardService = createProvider<IKeyboardService>(({ }) => {
    const keyPress: [string, KeyHandler][] = [];
    return {
        addHandler(key: string, handler: KeyHandler) {
            const pair: [string, KeyHandler] = [key, handler]
            keyPress.push(pair)
            return () => keyPress.splice(keyPress.indexOf(pair), 1)
        },
        init() {
            window.addEventListener("keydown", (event) => {
                console.log(event.key, "pressed. Still needs implementation")
            })
            window.addEventListener("keyup", () => {
                
            })
        }
    }
})