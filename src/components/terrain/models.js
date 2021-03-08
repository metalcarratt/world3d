import renderBrush from '@/components/edit/renderBrush.js';
import terrainUtil from '@/components/terrain/terrain.js';

import waterModel from '@/models/water.model';
import grassModel from '@/models/grass.model';
import rockModel from '@/models/rock.model';
import trunkModel from '@/models/trunk.model';
import playerModel from '@/models/player.model';
import riverModel from '@/models/river.model';
import riverBendModel from '@/models/river-bend.model';
import bridgeModel from '@/models/bridge.model';
import marbleModel from '@/models/marble.model';
import leavesModel from '@/models/leaves.model';
import xModel from '@/models/x.model';
import wall from '@/models/wall.model';
import wallCorner from '@/models/wall-corner.model';
import wallWindow from '@/models/wall-window.model';
import { Path } from 'three';

const WATER = 'Water', GRASS = 'Grass', ROCK = 'Rock', TRUNK = 'Trunk', PLAYER = 'Player', RIVER = 'River', RIVER_BEND = "River Bend",
    BRIDGE = 'Bridge', MARBLE = 'Marble', LEAVES = "Leaves", X = "X", WALL = "Wall", WALL_CORNER = "Wall Corner", WALL_WINDOW = "Wall Window";

const models = [
    { id: 0,  name: X,          model: xModel,         passable: false },
    { id: 1,  name: WATER,      model: waterModel,     passable: false },
    { id: 2,  name: GRASS,      model: grassModel,     passable: true  },
    { id: 3,  name: ROCK,       model: rockModel,      passable: true },
    { id: 4,  name: TRUNK,      model: trunkModel,     passable: true },
    { id: 5,  name: PLAYER,     model: playerModel,    passable: false },
    { id: 6,  name: RIVER,      model: riverModel,     passable: false },
    { id: 7,  name: RIVER_BEND, model: riverBendModel, passable: false },
    { id: 8,  name: BRIDGE,     model: bridgeModel,    passable: true },
    { id: 9,  name: MARBLE,     model: marbleModel,    passable: true },
    { id: 10, name: LEAVES,     model: leavesModel,    passable: true },
    { id: 11, name: WALL,       model: wall,           passable: false },
    { id: 12, name: WALL_CORNER,model: wallCorner,     passable: false },
    { id: 13, name: WALL_WINDOW,model: wallWindow,     passable: false }
];

export default {
    allModels: [WATER, GRASS, ROCK, TRUNK, RIVER, RIVER_BEND, BRIDGE, MARBLE, LEAVES, WALL, WALL_CORNER, WALL_WINDOW],
    specialModels: [PLAYER, X],
    getModelForName: (name) => {
        const model = models.find(m => m.name === name);
        if (model) {
            return model.model;
        } else {
            return undefined;
        }
        
    },
    getIdForName: (name) => {
        const foundModel = models.find(m => m.name === name);
        if (foundModel) {
            return models.find(m => m.name === name).id
        } else {
            return `user:${name}`;
        }
    },
    getNameForId: (id) => models.find(m => m.id === id).name,
    isPassable: (id) => {
        window.console.log("in ispassable");
        window.console.log(`id: ${id}`);
        return models.find(m => m.id === id).passable;
    },
    meshModel: (model, translate = false) => renderBrush.mesh(model, translate),
    mesh(id, translate = false) {
        let model;
        if (typeof id === 'number') {
            const name = this.getNameForId(id);
            model = this.getModelForName(name);
        } else {
            const name = id.substring(5);
            model = terrainUtil.loadTerrain(name).polygon;
        }
        // window.console.log(model);
        return renderBrush.mesh(model, translate);
    }
}