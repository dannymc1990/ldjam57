import { createProvider } from "difunkt";

export const AppRunnable = createProvider(() => {
    console.log("Idjam Running!")
})