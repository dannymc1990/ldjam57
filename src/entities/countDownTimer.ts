import gsap from "gsap";
import { Text } from "pixi.js";

export class CountDownTimer extends Text {
	private time = 60;
	private timerTween?: gsap.core.Tween;
	public onComplete?: VoidFunction;

	constructor(x: number, y: number, time?: number) {
		super();
		this.time = time ?? this.time;
		this.x = x;
		this.y = y;
		this.style.fontSize = 16;
		this.style.fill = 0xffffff;
		this.style.stroke = 0x000000;
		this.updateTime();
		this.start();
	}

	private updateTime() {
		this.text = 'Time:' + this.time.toFixed();
	}

	start() {
		this.timerTween?.kill();
		this.timerTween = gsap.to(this, {
			time: 0,
			duration: 20,
			ease: 'none',
			onUpdate: () => {
				this.updateTime();
			},
			onComplete: () => {
				this.onComplete?.();
			}
		});
	}
	
	pause() {
		this.timerTween?.pause();
	}

	kill() {
		this.timerTween?.kill();
	}
}
