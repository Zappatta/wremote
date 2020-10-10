<template>
    <div class="mode-control-wrapper">
        <i class="flaticon-mode-circular-button mode-icon"  ></i>
            <v-btn-toggle v-model="localMode">
                <v-btn text class="mode-button"> <i class="flaticon-magic-wand"></i> </v-btn>
                <v-btn text class="mode-button"> <i class="flaticon-snowflake"></i></v-btn>
                <v-btn text class="mode-button"> <i class="flaticon-drought"></i></v-btn>
                <v-btn text class="mode-button"> <i class="flaticon-vehicle"></i></v-btn>
                <v-btn text class="mode-button"> <i class="flaticon-sun"></i></v-btn>
            </v-btn-toggle>

    </div>
</template>

<script>

import VToolbar from "../../../node_modules/vuetify/src/components/VToolbar/VToolbar.vue";
import VBtn from "../../../node_modules/vuetify/src/components/VBtn/VBtn.vue";
import VBtnToggle from "../../../node_modules/vuetify/src/components/VBtnToggle/VBtnToggle.vue";

export default {
        components: {
            VBtnToggle,
            VBtn,
            VToolbar
        },
        props: ['value'],
        computed: {
            localMode: {
                get() {
                    return this.value;
                },
                set(val){
                    this.$emit('change', val);
                }
            }
        }


    }
</script>

<style lang="scss" rel="stylesheet/scss">

    .application--light {
        width: 100%;
        .mode-control-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;

            .btn-toggle {
                flex-grow:1;
                .btn {
                    flex-grow:1;
                }
            }

            .mode-icon {
                margin:10px;
                font-weight: bold;

            }

            .mode-button {
                &.btn--active {
                    color: green;
                }
            }

        }
    }


</style>
