import buildSelector from '@/models/selector.js';
import board from './board.js';

let selector = null;

const selectorLocation = {
    x: 1,
    y: 2,
    z: 1,
    show: false
}

const positionSelector = function() {
    // window.console.log("position selector");
    // window.console.log(selectorLocation);
    selector.position.x = selectorLocation.x - board.getMid().midx;
    selector.position.y = selectorLocation.y - board.getMid().midy;
    selector.position.z = selectorLocation.z + 0.5;
    selector.visible = selectorLocation.show;
}

const initSelector = function() {
    selector = buildSelector.mesh();
    positionSelector();
    board.group.add(selector);
}

const getSelectorLocation = function() {
    return selectorLocation;
}

const updateSelectorLocation = function({x, y, z, show}) {
    // window.console.log(`update selector location x=${x} y=${y} show=${show}`);
    if (x !== undefined) {
        selectorLocation.x = x;
    }
    if (y !== undefined) {
        selectorLocation.y = y;
    }
    if (z !== undefined) {
        selectorLocation.z = z;
    }
    if (show !== undefined) {
        selectorLocation.show = show;
    }
    // window.console.log(selectorLocation);
}

export default {
    positionSelector,
    initSelector,
    getSelectorLocation,
    updateSelectorLocation
}