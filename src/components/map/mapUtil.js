import boardUtil from '@/components/board/board.js';

const WORLDS = "worlds";
const LAST_WORLD_ID = "lastWorldId";
const WORLD = "world";

const getWorlds = () => JSON.parse(storage.getItem(WORLDS));
const setWorlds = (worlds) => storage.setItem(WORLDS, JSON.stringify(worlds));
const getWorld = (id) => JSON.parse(storage.getItem(WORLD + id))
const setWorld = (id, board) => storage.setItem(WORLD + id, JSON.stringify(board));
const removeWorld = (id) => storage.removeItem(WORLD + id);
const getLastWorldId = () => parseInt(storage.getItem(LAST_WORLD_ID));
const setLastWorldId = (id) => storage.setItem(LAST_WORLD_ID, id);

const storage = window.localStorage;

const newWorldId = function() {
    const lastWorldId = getLastWorldId();
    if (isNaN(lastWorldId)) {
        storage.setItem(LAST_WORLD_ID, 1);
        return 1;
    } else {
        const newId = lastWorldId + 1;
        setLastWorldId(newId);
        return newId;
    }
}

const saveToWorldListAndGetId = function(worldName) {
    let worlds = getWorlds();
    if (worlds == null) {
        worlds = {};
    }
    if (Object.keys(worlds).includes(worldName)) {
        window.console.log(`world exists, returning ${worlds[worldName]}`);
        return worlds[worldName];
    } else {
        const worldId = newWorldId();
        worlds[worldName] = worldId;
        setWorlds(worlds);
        return worldId;
    }
}

const saveMap = function(worldName) {
    window.console.log("save map");
    const worldId = saveToWorldListAndGetId(worldName);

    window.console.log(`worldId: ${worldId}`);

    const board = boardUtil.getBoard();
    const world = {
        map: board,
        name: worldName
    }
    setWorld(worldId, world);
}

const loadMap = function(worldName) {
    const worlds = getWorlds();
    const worldId = worlds[worldName];
    return getWorld(worldId);
}

const removeMap = function(worldName) {
    let worlds = getWorlds();
    const id = worlds[worldName];
    delete worlds[worldName];
    setWorlds(worlds);

    removeWorld(id);
}

const listMaps = function() {
    const worlds = getWorlds();
    return Object.keys(worlds);
}

export default {
    saveMap,
    loadMap,
    removeMap,
    listMaps
}