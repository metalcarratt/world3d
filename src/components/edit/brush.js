import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const WATER = "water";
// const GRASS = "grass";
// const ROCK = "rock";
// const TREE = "tree";

const brush = new Vuex.Store({
    state: {
        brush: WATER,
        orientation: 'N'
    },
    getters: {
        brush(state) {
            return state.brush;
        },
        orientation(state) {
            return state.orientation;
        }
    },
    mutations: {
        setBrush (state, newBrush) {
            state.brush = newBrush;
        },
        setOrientation(state, newOrientation) {
            state.orientation = newOrientation;
        }
    },
    getBrush() {
        return this.getters.brush(this.state);
    },
    getOrientation() {
        return this.getters.orientation(this.state);
    },
    setBrush(newBrush) {
        this.commit('setBrush', newBrush);
    },
    setOrientation(newOrientation) {
        this.commit('setOrientation', newOrientation);
    }
});

export default {
    getBrush() {
        return brush.getters.brush;
    },
    setBrush(newBrush) {
        brush.commit('setBrush', newBrush);
    },
    getOrientation() {
        return brush.getters.orientation;
    },
    setOrientation(newOrientation) {
        brush.commit('setOrientation', newOrientation);
    }
}
