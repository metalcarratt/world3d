import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const WALK = "walk", EDIT = "edit", MODAL = "modal";

const modes = new Vuex.Store({
    state: {
        mode: WALK,
        lastMode: WALK
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
        },
        setModeModal(state) {
            state.lastMode = state.mode;
            state.mode = MODAL
        },
        returnToLastMode(state) {
            state.mode = state.lastMode;
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
    modalOpened() {
        modes.commit('setModeModal');
    },
    modalClosed() {
        modes.commit('returnToLastMode');
    },
    isWalking() {
        return modes.getters.isWalking;
    },
    isEditing() {
        return modes.getters.isEditing;
    }
}

