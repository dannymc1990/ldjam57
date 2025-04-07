export interface KeyHandler {
    onPress: Function,
    onRelease?: Function
}

export interface IKeyboardService {
    addHandler(key: string, keys: KeyHandler): Function
}