import { BlurFilter, Graphics, Rectangle, Renderer, SCALE_MODES, Sprite } from "pixi.js";
import { IEntity } from "./entities.types";
import gsap from "gsap";

const DEFAULT_RADIUS = 50;
const COOLDOWN_DELAY = 3; // in seconds

export class SpotLight extends Sprite implements IEntity {
	private radius = DEFAULT_RADIUS;
	private blurSize = 18;
	private color = 0xff0000;
	private created = false;
	private zoomTween?: gsap.core.Tween;

	constructor(private renderer: Renderer, private target: Sprite) {
		super();
		this.label = 'spotlight';
		this.updateTexture();
		this.onUpdate = this.onUpdate.bind(this);
		this.init();
	}

	private init() {
		// add some delay, so that it only renders once all the entites are rendered on the stage
		gsap.delayedCall(1, () => {
			this.created = true;
		});
	}

	private createTexture() {
		this.removeChildren();

		const circle = new Graphics().circle(this.radius + this.blurSize, this.radius + this.blurSize, this.radius).fill({ color: this.color });

		circle.filters = [new BlurFilter(this.blurSize)];

		const bounds = new Rectangle(0, 0, (this.radius + this.blurSize) * 2, (this.radius + this.blurSize) * 2);
		const texture = this.renderer.generateTexture({
			target: circle,
			style: { scaleMode: SCALE_MODES.NEAREST },
			resolution: 1,
			frame: bounds,
		});

		return texture;
	}

	private updateTexture() {
		this.texture = this.createTexture();
	}

	private cooldown() {
		this.zoom(DEFAULT_RADIUS, COOLDOWN_DELAY);
	}

	zoom(radius: number, delay?: number, duration?: number) {
		const _duration = duration ?? 1;
		const _delay = delay ?? 0;

		this.zoomTween?.kill();
		this.zoomTween = gsap.to(this, {
			radius,
			delay: _delay,
			duration: _duration,
			onUpdate: () => {
				this.updateTexture();
			},
			onComplete: () => {
				this.cooldown();
			}
		});
	}

	onUpdate() {
		if (!this.created) {
			return;
		}
		this.x = this.target.x - this.width / 2;
		this.y = this.target.y - this.height / 2;
	}

}
