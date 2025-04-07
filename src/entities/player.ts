import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { IEntity } from "./entities.types";
import { IKeyboardService } from "~/core/keyboard/keyboard.types";

export class Player extends Sprite implements IEntity {
	private animations: {[name: string]: AnimatedSprite} = {};
	private currentAnimation!: AnimatedSprite; 

	private isMovingForwards = false;
	private isMovingBackwards = false;
	private isMovingLeft = false;
	private isMovingRight = false;
	
	constructor(private keyboardService: IKeyboardService, x: number, y: number, w: number, h: number) {
		super();
		this.x = x;
		this.y = y;
		this.onUpdate = this.onUpdate.bind(this)
		this.setupKeypress();
	}

	private setupKeypress() {
		this.keyboardService.addHandler("W", {
			onPress: () => this.isMovingForwards = true,
			onRelease: () => this.isMovingBackwards = false,
		})
	}

	onUpdate(entities: Container[]) {
		if (this.isMovingForwards) {
			// Move player forward
		}
		if (this.isMovingLeft) {
			// Move player left
		}
		if (this.isMovingRight) {
			// Move player right
		}
		if (this.isMovingBackwards) {
			// Move player back
		}
	}

	add(name: string, frames: Texture[]) {
		if (this.animations[name]) {
			return;
		}
		const anim = new AnimatedSprite(frames);
		anim.label = name;
		anim.animationSpeed = 0.2;
		this.animations[name] = anim;
		this.currentAnimation = anim;
	}

	play(name: string) {
		if (this.currentAnimation.label === 'name') {
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
