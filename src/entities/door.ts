import { Sprite, Texture } from "pixi.js";

export class Door extends Sprite {
	constructor(x: number, y: number, w: number, h: number) {
		super();
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.texture = Texture.WHITE;
		this.tint = 0xbe00ff;
	}
}
