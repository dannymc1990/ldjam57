import { AnimatedSprite, Texture } from "pixi.js";

export class Spike extends AnimatedSprite {

	constructor(x: number, y: number, w: number, h: number, frames: Texture[]) {
		super(frames);

		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.animationSpeed = 0.1;
		this.play();
	}
}
