<template>
    <span class="editPolygon">

        <span class="row">
            <label>Texture:</label>
            <fieldset>
                <select  v-model="polygon.texture" >
                    <option>bark</option>
                    <option>grass</option>
                    <option>hair</option>
                    <option>leaves</option>
                    <option>rock</option>
                    <option>skin</option>
                    <option>water</option>
                    <option>whiteCloth</option>
                </select>
            </fieldset>
        </span>

        <span class="row">
            <label>Position & Size:</label>
            <fieldset>
                <label class="sub">x: </label><input type="text" size="1" v-model="polygon.x"  />
            </fieldset>
            <fieldset>
                <label class="sub">y: </label><input type="text" size="1" v-model="polygon.y"  />
            </fieldset>
            <fieldset>
                <label class="sub">z: </label><input type="text" size="1" v-model="polygon.z"  />
            </fieldset>
            <fieldset>
                <label class="sub">w: </label><input type="text" size="1" v-model="polygon.w"  />
            </fieldset>
            <fieldset>
                <label class="sub">l: </label><input type="text" size="1" v-model="polygon.l"  />
            </fieldset>
            <fieldset>
                <label class="sub">h: </label><input type="text" size="1" v-model="polygon.h"  />
            </fieldset>
        </span>
        <button @click="propogatePolygon">Update</button>
        
    </span>
</template>

<script>

const translateFromThreeJs = function(coord, length) {
    const base = coord * 100;
    const offset = length * 100 / 2;
    const t = parseInt(base - offset);
    window.console.log(`translate from three js: coord=${coord}, length=${length}, result=${t}`);
    return t;
}

const translateToThreeJs = function(coord, length) {
    const base = parseInt(coord) / 100;
    const offset = length / 100 / 2;
    const t = (base + offset).toFixed(2);
    window.console.log(`translate TO three js: coord=${coord}, length=${length}, result=${t}`);
    return t;
}

export default {
    props: ['value'],
    data() {
        return {
            polygon: {} //this.value
        }
    },
    mounted() {
        this.updatePolygon()
    },
    watch: {
        value: {
            deep: true,
            handler() {
                this.updatePolygon();
            }
        }
    },
    methods: {
        updatePolygon() {
            this.polygon = {
                x: translateFromThreeJs(this.value.x, this.value.w),
                y: translateFromThreeJs(this.value.y, this.value.l),
                z: translateFromThreeJs(this.value.z, this.value.h),
                w: parseInt(this.value.w * 100),
                l: parseInt(this.value.l * 100),
                h: parseInt(this.value.h * 100),
                texture: this.value.texture
            }
            // window.console.log("updatePolygon");
            // window.console.log(this.value);
            // window.console.log(this.polygon);
        },
        propogatePolygon() {
            // this.$emit('input', {
            //         x: translateToThreeJs(this.polygon.x, this.polygon.w),
            //         y: translateToThreeJs(this.polygon.y, this.polygon.l),
            //         z: translateToThreeJs(this.polygon.z, this.polygon.h),
            //         w: this.polygon.w / 100,
            //         l: this.polygon.l / 100,
            //         h: this.polygon.h / 100,
            //         texture: this.polygon.texture
            //     });
            const prop = {
                    x: translateToThreeJs(this.polygon.x, this.polygon.w),
                    y: translateToThreeJs(this.polygon.y, this.polygon.l),
                    z: translateToThreeJs(this.polygon.z, this.polygon.h),
                    w: (this.polygon.w / 100).toFixed(2),
                    l: (this.polygon.l / 100).toFixed(2),
                    h: (this.polygon.h / 100).toFixed(2),
                    texture: this.polygon.texture
                }
            window.console.log("propogatePolygon");
            window.console.log(this.polygon);
            // window.console.log(prop);
            this.$emit('input', prop);
        }
    }
}
</script>

<style scoped>
.editPolygon {
    display: block;
    background-color: #eee;
    border-radius: 4px;
    padding: 8px;
}

.row {
    display: block;
}

fieldset {
    display: inline-block;
    border: none;
    padding: 0;
}

fieldset + fieldset {
    margin-left: 10px;
}

label {
    width: 80px;
    display: inline-block;
    font-weight: 700;
    vertical-align: top;
}

label.sub {
    width: 20px;
    font-weight: 400;
}

input[type="text"] {
    width: 30px;
}
</style>