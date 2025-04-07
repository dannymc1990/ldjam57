import { createProvider } from "difunkt";
import { PixiApplication } from "../pixi";

export const ResizerService = createProvider(({ inject }) => {
	const app = inject(PixiApplication);
	const gameWidth = 320;
	const gameHeight = 180;

	window.onresize = () => {
		init();
	}

	function init() {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		// available ratio
		const availableRatio = windowWidth / windowHeight;
		// base ratio
		const canvasRatio = gameWidth / gameHeight;
		let appliedWidth = 0;
		let appliedHeight = 0;

		if (availableRatio <= canvasRatio) {
			appliedWidth = windowWidth;
			appliedHeight = appliedWidth / canvasRatio;
		} else {
			appliedHeight = windowHeight;
			appliedWidth = appliedHeight * canvasRatio;
		}

		app.canvas.style.width = appliedWidth + 'px';
		app.canvas.style.height = appliedHeight + 'px';
	}

	return {
		init
	}
})
