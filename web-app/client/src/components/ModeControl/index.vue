<template>
    <div class="mode-control-wrapper">
        <i class="flaticon-mode-circular-button mode-icon"  ></i>
            <v-btn-toggle v-model="localMode">
                <v-btn text class="mode-button button-1">
                  <i class="flaticon-magic-wand"></i>
                </v-btn>
                <v-btn text class="mode-button button-2"><i class="flaticon-snowflake"></i></v-btn>
                <v-btn text class="mode-button button-3"><i class="flaticon-drought"></i></v-btn>
                <v-btn text class="mode-button button-4"><i class="flaticon-vehicle"></i></v-btn>
                <v-btn text class="mode-button button-5"><i class="flaticon-sun"></i></v-btn>
            </v-btn-toggle>

    </div>
</template>

<script>

export default {
  components: {
  },
  props: ['value'],
  computed: {
    localMode: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
  },

};
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
