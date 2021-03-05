import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const NEW_MAP_MODAL = "newMapModal";
const LOAD_MAP_MODAL = "loadMapModal";
const EDIT_MAP_MODAL = "editMapModal";
const CHOOSE_BRUSH_MODAL = "chooseBrushModal";
const EDIT_BRUSH_MODAL = "editBrushModal";
const CHOOSE_TEXTURE_MODAL = "chooseTextureModal";
const EDIT_TEXTURE_MODAL = "editTextureModal";

const store = new Vuex.Store({
    state: {
        currentModal: '',
        arguments: {},
        openModals: []
    }
});

export default {
    NEW_MAP_MODAL, LOAD_MAP_MODAL, EDIT_MAP_MODAL, CHOOSE_BRUSH_MODAL, EDIT_BRUSH_MODAL, CHOOSE_TEXTURE_MODAL, EDIT_TEXTURE_MODAL,
    watchCurrentModal: () => store.state.currentModal,
    openModal(modalName, args) {
        if (store.state.currentModal) {
            store.state.openModals.push(store.state.currentModal);
        }
        store.state.arguments = args;
        store.state.currentModal = modalName;
    },
    closeModal() {
        store.state.currentModal = '';
        if (store.state.openModals.length > 0) {
            store.state.currentModal = store.state.openModals.pop();
        }
    },
    getArguments() {
        return store.state.arguments;
    }
}