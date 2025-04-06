import { createProvider } from "difunkt";
import { Container, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { AssetsService } from "~/core/assets";
import { PixiApplication } from "~/core/pixi";
import { Block } from "~/entities/block";
import { Door } from "~/entities/door";
import { Key } from "~/entities/key";
import { Player } from "~/entities/player";
import { Spike } from "~/entities/spike";
import { Torch } from "~/entities/torch";

interface TileLayer {
	arrayMode: number;
	data: number[]; 
	exportMode: number;
	gridCellHeight: number;
	gridCellWidth: number;
	gridCellsX: number;
	gridCellsY: number;
	name: string;
	offsetX: number;
	offsetY: number;
	tileset: string;
	_eid : string;
}

interface EntityLayer {
	entities: Entity[];
	gridCellHeight: number;
	gridCellWidth: number;
	gridCellsX: number;
	gridCellsY: number;
	name: string;
	offsetX: number;
	offsetY: number;
	_eid : string;
}

interface Entity {
	height: number;
	id: number;
	name: string;
	originX: number;
	originY: number;
	width: number;
	x: number;
	y: number;
	_eid: string;
}

type LevelLayers = (TileLayer | EntityLayer) []; 

interface LevelJson {
	height: number;
	layers: LevelLayers;
	offsetX: number;
	offsetY: number;
	ogmoVersion: string;
	width: number;
}

const CURRENT_LEVEL = 1;

export const LevelService = createProvider(({ inject }) => {
	const app = inject(PixiApplication);
	const assets = inject(AssetsService);
	const level = assets.get<LevelJson>(`level${CURRENT_LEVEL}.json`)!;
	const tileTexture = assets.get<Texture>('tiles.png');
	const spikes: Spike[] = [];
	const torches: Torch[] = [];
	const doors: Door[] = [];
	const blocks: Block[] = [];
	const keys: Key[] = [];
	let player: Player;

	// debug-tool using https://github.com/bfanger/pixi-inspector
	globalThis.__PIXI_APP__ = app;

	const gameContainer = new Container();
	app.stage.addChild(gameContainer);

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
				tileSprite.name = 'tile' + i;
				const x = i % tile.gridCellsX * tile.gridCellWidth;
				const y = Math.floor(i / tile.gridCellsX) * tile.gridCellWidth;

				tileSprite.x = x;
				tileSprite.y = y;
				tilesContainer.addChild(tileSprite);
			}
		});
	}

	function renderEntities(layers: LevelLayers) {
		const entitiesContainer = new Container();
		gameContainer.addChild(entitiesContainer);

		const getFrames = (frame: string) => {
			return assets.from('env').getFrames(frame)!;
		};

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
						const getFrames = (frame: string, ) => {
							return assets.from('player').getFrames(frame)!;
						};
						player = new Player(x, y, w, h);
						player.name = name;
						player.add('idleUp', getFrames('idle_up')),
						player.add('idleDown', getFrames('idle_down')),
						player.add('walkLeft', getFrames('walk_left')),
						player.add('walkRight', getFrames('walk_right')),
						player.add('walkUp', getFrames('walk_up')),
						player.add('walkDown', getFrames('walk_down')),

						player.play('idleDown');

						entitiesContainer.addChild(player);
					}
					if (name === 'door') {
						const door = new Door(x, y, w, h);
						door.name = name + i;
						doors.push(door);

						door.alpha = 0.5;

						entitiesContainer.addChild(door);
					}
					if (name === 'torch') {
						const frames = getFrames('torch');
						const torch = new Torch(x, y, w, h, frames);
						torch.name = name + i;
						torches.push(torch);

						entitiesContainer.addChild(torch);
					}
					if (name === 'key') {
						const frames = getFrames('key');
						const key = new Torch(x, y, w, h, frames);
						key.name = name + i;
						keys.push(key);

						entitiesContainer.addChild(key);
					}
					if (name === 'spike') {
						const frames = getFrames('spike');
						const spike = new Spike(x, y, w, h, frames);
						spike.name = name + i;
						spikes.push(spike);

						entitiesContainer.addChild(spike);
					}
				}

				if (layerName === 'collision') {
					if (name === 'block') {
						const block = new Block(x, y, w, h);
						block.name = name + i;
						blocks.push(block);

						block.alpha = 0.5;

						entitiesContainer.addChild(block);
					}
				}
			});
		});
	}

	return {
		init: () => {
			const layers = level.layers;
			const tileLayer = level.layers[0] as TileLayer;
			const entitiesLayer = layers.filter((_, i) => i) as EntityLayer[];

			renderTiles(tileLayer);
			renderEntities(entitiesLayer);
		}
	}
})
