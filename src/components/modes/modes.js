import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const WALK = "walk", EDIT = "edit", MODAL = "modal";

const modes = new Vuex.Store({
    state: {
        mode: WALK,
        lastMode: WALK
    }
});

export default {
    setWalking: () => modes.state.mode = WALK,
    setEditing: () => modes.state.mode = EDIT,
    modalOpened() {
        modes.state.lastMode = modes.state.mode;
        modes.state.mode = MODAL
    },
    modalClosed: () => modes.state.mode = modes.state.lastMode,
    isWalking: () => modes.state.mode === WALK,
    isEditing: () => modes.state.mode === EDIT
}

