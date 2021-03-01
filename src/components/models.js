import renderBrush from '@/components/edit/renderBrush.js';

import waterModel from '@/models/water.model';
import grassModel from '@/models/grass.model';
import rockModel from '@/models/rock.model';
import treeModel from '@/models/tree.model';
import playerModel from '@/models/player.model';
import riverModel from '@/models/river.model';

const WATER = 'Water', GRASS = 'Grass', ROCK = 'Rock', TREE = 'Tree', PLAYER = 'Player', RIVER = 'River';

const models = [
    { id: 0, name: WATER,  model: waterModel,  passable: false },
    { id: 1, name: GRASS,  model: grassModel,  passable: true  },
    { id: 2, name: ROCK,   model: rockModel,   passable: false },
    { id: 3, name: TREE,   model: treeModel,   passable: false },
    { id: 4, name: PLAYER, model: playerModel, passable: false },
    { id: 5, name: RIVER, model: riverModel,   passable: false }
];

export default {
    allModels: [WATER, GRASS, ROCK, TREE, PLAYER, RIVER],
    getModelForName: (name) => models.find(m => m.name === name).model,
    getIdForName: (name) => models.find(m => m.name === name).id,
    getNameForId: (id) => models.find(m => m.id === id).name,
    isPassable: (id) => models.find(m => m.id === id).passable,
    meshModel(model, translate = false) {
        return renderBrush.mesh(model, translate);
    },
    mesh(id, translate = false) {
        // window.console.log(`model.mesh ${id}`);
        const name = this.getNameForId(id);
        const model = this.getModelForName(name);
        // window.console.log(model);
        return renderBrush.mesh(model, translate);
    }
}