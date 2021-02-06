import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const WATER = "water";
// const GRASS = "grass";
// const ROCK = "rock";
// const TREE = "tree";

const brush = new Vuex.Store({
    state: {
        brush: WATER
    },
    getters: {
        brush(state) {
            return state.brush;
        }
    },
    mutations: {
        setBrush (state, newBrush) {
            state.brush = newBrush;
        }
    },
    getBrush() {
        return this.getters.brush(this.state);
    },
    setBrush(newBrush) {
        this.commit('setBrush', newBrush);
    }
});

export default {
    getBrush() {
        return brush.getters.brush;
    },
    setBrush(newBrush) {
        brush.commit('setBrush', newBrush);
    }
}
