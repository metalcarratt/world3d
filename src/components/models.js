import renderBrush from '@/components/edit/renderBrush.js';

import waterModel from '@/models/water.model';
import grassModel from '@/models/grass.model';
import rockModel from '@/models/rock.model';
import treeModel from '@/models/tree.model';
import playerModel from '@/models/player.model';

const WATER = 'Water', GRASS = 'Grass', ROCK = 'Rock', TREE = 'Tree', PLAYER = 'Player';

export default {
    allModels: [WATER, GRASS, ROCK, TREE, PLAYER],
    getModelForName(name) {
        // window.console.log(`getting model for ${name}`);
        switch (name) {
            case WATER:
                return waterModel;
            case GRASS:
                return grassModel;
            case ROCK:
                return rockModel;
            case TREE:
                return treeModel;
            case PLAYER:
                return playerModel;
        }
    },
    getIdForName(name) {
        switch (name) {
            case WATER:
                return 0;
            case GRASS:
                return 1;
            case ROCK:
                return 2;
            case TREE:
                return 3;
        }
    },
    getNameForId(id) {
        switch (id) {
            case 0:
                return WATER;
            case 1:
                return GRASS;
            case 2:
                return ROCK;
            case 3:
                return TREE;
        }
    },
    meshModel(model) {
        return renderBrush.mesh(model);
    },
    mesh(id) {
        // window.console.log(`model.mesh ${id}`);
        const name = this.getNameForId(id);
        const model = this.getModelForName(name);
        // window.console.log(model);
        return renderBrush.mesh(model);
    }
}