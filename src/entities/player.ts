import { AnimatedSprite, Sprite, Texture } from "pixi.js";

export class Player extends Sprite {
	private animations: {[name: string]: AnimatedSprite} = {};
	private currentAnimation!: AnimatedSprite; 

	constructor(x: number, y: number, w: number, h: number) {
		super();
		this.x = x;
		this.y = y;
	}

	add(name: string, frames: Texture[]) {
		if (this.animations[name]) {
			return;
		}
		const anim = new AnimatedSprite(frames);
		anim.name = name;
		anim.animationSpeed = 0.2;
		this.animations[name] = anim;
		this.currentAnimation = anim;
	}

	play(name: string) {
		if (this.currentAnimation.name === 'name') {
			return;
		}
		this.currentAnimation.stop();
		this.removeChild(this.currentAnimation);

		this.currentAnimation = this.animations[name];
		this.currentAnimation.play();
		this.addChild(this.currentAnimation);
	}

	stop() {
		this.currentAnimation.stop();
	}
}
