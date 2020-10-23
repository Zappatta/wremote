<template>
    <div class="fan-control-wrapper">
        <i class="flaticon-vehicle fan-icon" ></i>
            <v-btn-toggle v-model="localSpeed" mandatory>
                <v-btn text class="fan-speed-button button-1">
                  <i class="flaticon-magic-wand"></i>
                </v-btn>
                <v-btn text class="fan-speed-button button-2"> 1 </v-btn>
                <v-btn text class="fan-speed-button button-3"> 2 </v-btn>
                <v-btn text class="fan-speed-button button-4"> 3 </v-btn>
            </v-btn-toggle>

    </div>
</template>

<script>

export default {
  components: {
  },
  props: ['value'],
  computed: {
    localSpeed: {
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
        .fan-control-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            .fan-icon {
                margin:10px;

            }

            .btn-toggle {
                flex-grow:1;
                .btn {
                    flex-grow:1;
                }
            }

            .fan-speed-button {

                &.btn--active {
                    color:green;
                }
            }

        }
    }

</style>
