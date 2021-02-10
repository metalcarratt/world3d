import buildSelector from '@/models/selector.js';
import board from './board.js';

let selector = null;

const selectorLocation = {
    x: 1,
    y: 2,
    z: 0.4,
    show: false
}

const positionSelector = function() {
    // window.console.log("position selector");
    // window.console.log(selectorLocation);
    selector.position.x = selectorLocation.x - board.getMid().midx;
    selector.position.y = selectorLocation.y - board.getMid().midy;
    selector.position.z = selectorLocation.z;
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

const updateSelectorLocation = function({x, y, show}) {
    // window.console.log(`update selector location x=${x} y=${y} show=${show}`);
    if (x) {
        selectorLocation.x = x;
    }
    if (y) {
        selectorLocation.y = y;
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