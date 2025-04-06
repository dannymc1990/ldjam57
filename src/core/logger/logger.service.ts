import { createProvider } from "difunkt";

export const LoggerService = createProvider(({ inject }) => {
    const prefix = inject("logger-prefix") as string;
    function formatMessages(...messages: string[]) {
        return [
            new Date().toLocaleTimeString(),
            `[${prefix}]`,
            ...messages
        ]
    }
    return {
        info(...messages: any[]) {
            console.log(...formatMessages(...messages))
        },
        warn(...messages: any[]) {
            console.warn(...formatMessages(...messages))
        },
        error(...messages: any[]) {
            console.error(...formatMessages(...messages))
        },
    }
})