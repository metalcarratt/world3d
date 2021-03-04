<template>
    <span>
        <NewMapModal v-show="showing === NEW_MAP_MODAL" @close="close" />
        <LoadMapModal v-show="showing === LOAD_MAP_MODAL" :ref="LOAD_MAP_MODAL" @close="close" />
        <EditMapModal v-show="showing === EDIT_MAP_MODAL" @close="close" />
        <ChooseBrush v-show="showing === CHOOSE_BRUSH_MODAL" @close="close" />
        <EditBrushModal
            v-show="showing === EDIT_BRUSH_MODAL"
            :ref="EDIT_BRUSH_MODAL"
            :visible="showing === EDIT_BRUSH_MODAL"
            @close="close"
        />
    </span>
</template>

<script>
import NewMapModal from '@/components/map/NewMapModal.vue';
import LoadMapModal from '@/components/map/LoadMapModal.vue';
import EditMapModal from '@/components/map/EditMapModal.vue';
import ChooseBrush from '@/components/edit/ChooseBrush.vue';
import EditBrushModal from '@/components/edit/EditBrushModal.vue';
import modes from '@/components/modes/modes.js';
import modalEventBus from '@/components/ui/modal/modalEventBus.js';

export default {
    components: { NewMapModal, LoadMapModal, EditMapModal, ChooseBrush, EditBrushModal },
    data() {
        return {
            showing: '',
            NEW_MAP_MODAL: modalEventBus.NEW_MAP_MODAL,
            LOAD_MAP_MODAL: modalEventBus.LOAD_MAP_MODAL,
            EDIT_MAP_MODAL: modalEventBus.EDIT_MAP_MODAL,
            CHOOSE_BRUSH_MODAL: modalEventBus.CHOOSE_BRUSH_MODAL,
            EDIT_BRUSH_MODAL: modalEventBus.EDIT_BRUSH_MODAL
        }
    },
    watch: {
        openModal() {
            if (this.openModal) {
                this.open(this.openModal);
            }
        }
    },
    computed: {
        openModal() {
            return modalEventBus.watchCurrentModal();
        }
    },
    methods: {
        open(modalName) {
            this.showing = modalName;
            modes.modalOpened();

            if (this.$refs[modalName]) {
                const args = modalEventBus.getArguments();
                this.$refs[modalName].onShow(args);
            }
        },
        close() {
            this.showing = '';
            modes.modalClosed();
            modalEventBus.closeModal();
        }
    }
}
</script>