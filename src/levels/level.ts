import { createProvider } from "difunkt";
import { Container, ContainerChild, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { AssetsService } from "~/core/assets";
import { PixiApplication } from "~/core/pixi";
import { Block } from "~/entities/block";
import { Door } from "~/entities/door";
import { Key } from "~/entities/key";
import { Player } from "~/entities/player";
import { Spike } from "~/entities/spike";
import { Torch } from "~/entities/torch";
import { TileLayer, LevelLayers, EntityLayer, LevelJson } from "./level.types";
import { IEntity } from "~/entities/entities.types";
import { KeyboardService } from "~/core/keyboard/keyboard.service";

const ENTITY_CONTAINER = "entityContainer"

export const LevelService = createProvider(({ inject }) => {
	const app = inject(PixiApplication);
	const assets = inject(AssetsService);
	const keyboard = inject(KeyboardService)
	const tileTexture = assets.get<Texture>('tiles.png');
	const spikes: Spike[] = [];
	const torches: Torch[] = [];
	const doors: Door[] = [];
	const blocks: Block[] = [];
	const keys: Key[] = [];
	const gameContainer = new Container();
	
	let player: Player;

	app.stage.addChild(gameContainer);

	const ticker = app.ticker.add(onUpdate)

	function renderTiles(tile: TileLayer) {
		const tileData = tile.data;
		const tilesetColumns = 10;
		const tilesContainer = new Container();
		tilesContainer.cacheAsTexture(true);

		gameContainer.addChild(tilesContainer);

		tileData.forEach((id, i) => {
			if (id > -1) {
				const tx = id % tilesetColumns * tile.gridCellWidth;
				const ty = Math.floor(id / tilesetColumns) * tile.gridCellWidth;

				// crop the tile image from the tileset
				const rect = new Rectangle(tx, ty, tile.gridCellWidth, tile.gridCellHeight);
				const texture = new Texture({
					source: tileTexture as any as TextureSource,
					frame: rect
				});
				const tileSprite = new Sprite(texture);
				tileSprite.label = 'tile' + i;
				const x = i % tile.gridCellsX * tile.gridCellWidth;
				const y = Math.floor(i / tile.gridCellsX) * tile.gridCellWidth;

				tileSprite.x = x;
				tileSprite.y = y;
				tilesContainer.addChild(tileSprite);
			}
		});
	}

	function getPlayerFrames(frame: string): Texture[] {
		return assets.from('player').getFrames(frame)!;

	}

	function getEnvFrames(frame: string) {
		return assets.from('env').getFrames(frame)!;
	};

	function renderEntities(layers: LevelLayers) {
		const entitiesContainer = new Container();

		entitiesContainer.label = ENTITY_CONTAINER;
		gameContainer.addChild(entitiesContainer);

		layers.forEach(_layer => {
			const layer = _layer as EntityLayer;
			const layerName = layer.name;

			const entities = layer.entities;

			entities.forEach((entity, i) => {
				const name = entity.name;
				const w = entity.width;
				const h = entity.height;
				const x = entity.x;
				const y = entity.y;

				if (layerName === 'entities') {
					if (name === 'player') {
						player = new Player(keyboard, x, y, w, h);
						player.label = name;
						player.add('idleUp', getPlayerFrames('idle_up')),
						player.add('idleDown', getPlayerFrames('idle_down')),
						player.add('walkLeft', getPlayerFrames('walk_left')),
						player.add('walkRight', getPlayerFrames('walk_right')),
						player.add('walkUp', getPlayerFrames('walk_up')),
						player.add('walkDown', getPlayerFrames('walk_down')),

						player.play('idleDown');

						entitiesContainer.addChild(player);
					}
					if (name === 'door') {
						const door = new Door(x, y, w, h);
						door.label = name + i;
						doors.push(door);

						door.alpha = 0.5;

						entitiesContainer.addChild(door);
					}
					if (name === 'torch') {
						const frames = getEnvFrames('torch');
						const torch = new Torch(x, y, w, h, frames);
						torch.label = name + i;
						torches.push(torch);

						entitiesContainer.addChild(torch);
					}
					if (name === 'key') {
						const frames = getEnvFrames('key');
						const key = new Torch(x, y, w, h, frames);
						key.label = name + i;
						keys.push(key);

						entitiesContainer.addChild(key);
					}
					if (name === 'spike') {
						const frames = getEnvFrames('spike');
						const spike = new Spike(x, y, w, h, frames);
						spike.label = name + i;
						spikes.push(spike);

						entitiesContainer.addChild(spike);
					}
				}

				if (layerName === 'collision') {
					if (name === 'block') {
						const block = new Block(x, y, w, h);
						block.label = name + i;
						blocks.push(block);

						block.alpha = 0.5;

						entitiesContainer.addChild(block);
					}
				}
			});
		});
	}

	function getEntitiesContainer() {
		return gameContainer.getChildByName(ENTITY_CONTAINER) as Container<ContainerChild & IEntity>;
	}

	function onUpdate() {
		const entitiesContainer = getEntitiesContainer();
		if (entitiesContainer) {
			for (const { onUpdate } of entitiesContainer.children) {
				if (!onUpdate) continue;
				onUpdate(entitiesContainer.children);
			}
		}
	}

	return {
		init: (levelId: number) => {
			const level = assets.get<LevelJson>(`level${levelId}.json`)!;

			const layers = level.layers;
			const tileLayer = level.layers[0] as TileLayer;
			const entitiesLayer = layers.filter((_, i) => i) as EntityLayer[];

			renderTiles(tileLayer);
			renderEntities(entitiesLayer);

			ticker.start();
		},
		destroy() {
			ticker.stop();
			// TODO: Remove level for reset
		}
	}
})
