import renderBrush from '@/components/edit/renderBrush.js';

import waterModel from '@/models/water.model';
import grassModel from '@/models/grass.model';
import rockModel from '@/models/rock.model';
import treeModel from '@/models/tree.model';
import playerModel from '@/models/player.model';
import riverModel from '@/models/river.model';
import riverBendModel from '@/models/river-bend.model';
import bridgeModel from '@/models/bridge.model';
import marbleModel from '@/models/marble.model';

const WATER = 'Water', GRASS = 'Grass', ROCK = 'Rock', TREE = 'Tree', PLAYER = 'Player', RIVER = 'River', RIVER_BEND = "River Bend",
    BRIDGE = 'Bridge', MARBLE = 'Marble';

const models = [
    { id: 0, name: WATER,      model: waterModel,     passable: false },
    { id: 1, name: GRASS,      model: grassModel,     passable: true  },
    { id: 2, name: ROCK,       model: rockModel,      passable: false },
    { id: 3, name: TREE,       model: treeModel,      passable: false },
    { id: 4, name: PLAYER,     model: playerModel,    passable: false },
    { id: 5, name: RIVER,      model: riverModel,     passable: false },
    { id: 6, name: RIVER_BEND, model: riverBendModel, passable: false },
    { id: 7, name: BRIDGE,     model: bridgeModel,    passable: true },
    { id: 8, name: MARBLE,     model: marbleModel,    passable: false }
];

export default {
    allModels: [WATER, GRASS, ROCK, TREE, RIVER, RIVER_BEND, BRIDGE, MARBLE],
    specialModels: [PLAYER],
    getModelForName: (name) => {
        const model = models.find(m => m.name === name);
        if (model) {
            return model.model;
        } else {
            return undefined;
        }
        
    },
    getIdForName: (name) => models.find(m => m.name === name).id,
    getNameForId: (id) => models.find(m => m.id === id).name,
    isPassable: (id) => {
        window.console.log("in ispassable");
        window.console.log(`id: ${id}`);
        return models.find(m => m.id === id).passable;
    },
    meshModel: (model, translate = false) => renderBrush.mesh(model, translate),
    mesh(id, translate = false) {
        const name = this.getNameForId(id);
        const model = this.getModelForName(name);
        // window.console.log(model);
        return renderBrush.mesh(model, translate);
    }
}