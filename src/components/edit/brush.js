import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const WATER = "water";

const brush = new Vuex.Store({
    state: {
        brush: WATER,
        orientation: 'N'
    }
});

export default {
    getBrush: () => brush.state.brush,
    setBrush: (newBrush) => brush.state.brush = newBrush,
    getOrientation: () => brush.state.orientation,
    setOrientation: (newOrientation) => brush.state.orientation = newOrientation
}
