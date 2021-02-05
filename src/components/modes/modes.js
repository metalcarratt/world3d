import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const WALK = "walk", EDIT = "edit";

const modes = new Vuex.Store({
    state: {
        mode: WALK
    },
    getters: {
        isWalking(state) {
            return state.mode === WALK;
        },
        isEditing(state) {
            return state.mode === EDIT;
        }
    },
    mutations: {
        setModeWalk (state) {
            state.mode = WALK
        },
        setModeEdit (state) {
            state.mode = EDIT
        }
    }
});

export default {
    setWalking() {
        modes.commit('setModeWalk');
    },
    setEditing() {
        modes.commit('setModeEdit');
    },
    isWalking() {
        return modes.getters.isWalking;
    },
    isEditing() {
        return modes.getters.isEditing;
    }
}

