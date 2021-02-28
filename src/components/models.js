import renderBrush from '@/components/edit/renderBrush.js';

import waterModel from '@/models/water.model';
import grassModel from '@/models/grass.model';
import rockModel from '@/models/rock.model';
import treeModel from '@/models/tree.model';
import playerModel from '@/models/player.model';

const WATER = 'Water', GRASS = 'Grass', ROCK = 'Rock', TREE = 'Tree', PLAYER = 'Player';

const models = [
    { id: 0, name: WATER,  model: waterModel  },
    { id: 1, name: GRASS,  model: grassModel  },
    { id: 2, name: ROCK,   model: rockModel   },
    { id: 3, name: TREE,   model: treeModel   },
    { id: 4, name: PLAYER, model: playerModel }
]

export default {
    allModels: [WATER, GRASS, ROCK, TREE, PLAYER],
    getModelForName: (name) => models.find(m => m.name === name).model,
    getIdForName: (name) => models.find(m => m.name === name).id,
    getNameForId: (id) => models.find(m => m.id === id).name,
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