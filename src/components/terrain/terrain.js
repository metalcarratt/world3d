import localStorageUtil from '@/components/storage/localStorageUtil.js';

const DATA_NAME = "terrain";

export default {
    listTerrain() {
        return localStorageUtil.list(DATA_NAME);
    },
    saveTerrain(name, polygon) {
        localStorageUtil.save(DATA_NAME, {name, polygon, passable: false}, name);
    },
    loadTerrain(name) {
        return localStorageUtil.load(DATA_NAME, name);
    }
}