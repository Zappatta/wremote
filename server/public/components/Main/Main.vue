<template>
    <v-app>
    <div class="main">

            <div class="actual-temp">
                right now:
                <div class="temp-text">
                    {{actualTemp}}
                </div>

                <span class="last-update-time" v-if="lastUpdateDiff > (30 * 1000)">
                    updated {{lastUpdateDiffInWords}}
                </span>
            </div>
            <hr>


        <div class="control">
            set:
            <div class="desired-temp">
                <div class="temp-text">{{desiredTemp}}</div>
                <v-btn class="temp-change-button" icon @click="desiredTemp++"><v-icon large>fa-arrow-up</v-icon></v-btn>
                <v-btn class="temp-change-button" icon @click="desiredTemp--"><v-icon large>fa-arrow-down</v-icon></v-btn>

            </div>
            <v-btn @click="power = !power" class="power-button" :class="{'on' : power}">
                <v-icon >fa-power-off</v-icon>
            </v-btn>

            <v-select
                    v-model="fan"
                    :items="[
                        {text: 'Auto', value:'0'},
                        {text: '1'},
                        {text: '2'},
                        {text: '3'}
                        ]"
                    label="fan"
            ></v-select>
            <v-select
                    v-model="mode"
                    :items="[
                        {text: 'Auto', value:'0'},
                        {text: 'Cold', value:'1'},
                        {text: 'Dry', value:'2'},
                        {text: 'Fan', value:'3'},
                        {text: 'Heat', value:'4'},

                        ]"
                    label="Mode"
            ></v-select>

        </div>
        <div class="send-container">
            <v-btn icon large class="send-button red" @click="updateServerWithState()">
                <v-icon>fa-wifi</v-icon>
            </v-btn>
        </div>

    </div>
    </v-app>
</template>
<script>
    import Vue from 'vue';
    import moment from 'moment';
    import VApp from "../../../node_modules/vuetify/src/components/VApp/VApp.vue";
    import VSwitch from "../../../node_modules/vuetify/src/components/VSwitch/VSwitch.vue";
    import VSelect from "../../../node_modules/vuetify/src/components/VSelect/VSelect.vue";
    import VIcon from "../../../node_modules/vuetify/src/components/VIcon/VIcon.vue";
    import VBtn from "../../../node_modules/vuetify/src/components/VBtn/VBtn.vue";

    import './styles.scss'

    export default {
        components: {
            VBtn,
            VIcon,
            VSelect,
            VSwitch,
            VApp},
        data: function(){
            return {
                actualTemp : 0,
                desiredTemp: 26,
                power: false,
                fan:2,
                mode:1,
                isOn: 1,
                isOff: 0,
                lastArduinoUpdateTime: null,
                lastUpdateDiff: null,
                lastUpdateDiffInWords: "Never"
            }
        },
        created: function () {

            let getInfoFromSever = ()=>{
                fetch('/rest/state',  {credentials: "same-origin"}).then((fetchRes)=>{
                    fetchRes.json().then((state)=>{

                        this.power = state.power !== 0;
                        this.fan = state.fan;
                        this.mode = state.mode;

                       updateTemp(state);
                    });
                });
            };

            let getTempFromServer = () => {
                fetch('/rest/state',  {credentials: "same-origin"}).then((fetchRes)=>{
                    fetchRes.json().then((state)=>{

                        updateTemp(state);

                    });
                });
            };

            let updateTemp = (state)=>{
                this.actualTemp = state.actualTemp;
                this.lastArduinoUpdateTime = state.lastArduinoUpdateTime;
                this.lastUpdateDiff = new Date().getTime() - state.lastArduinoUpdateTime;
                this.lastUpdateDiffInWords = moment(this.lastArduinoUpdateTime, 'x').fromNow()
            };

            getInfoFromSever();
            setInterval(getTempFromServer, 5000);
        },
        methods: {
            updateServerWithState(){
                let {actualTemp, desiredTemp, power, fan, mode} = this;

                fetch('/rest/state', {
                    method:"POST",
                    credentials: "same-origin",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({actualTemp, desiredTemp, power: power ? 1 : 0, fan, mode})
                });
            }
        },
        computed: {
            lastUpdateTime(){
                if(!this.lastArduinoUpdateTime){
                    return "never";
                }
                return moment(this.lastArduinoUpdateTime, 'x').fromNow();
            },
            isArduinoUpdating(){
                if(new Date().getTime() - this.lastArduinoUpdateTime > 30 * 1000){
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }
</script>
<style>
 #modes {
     display: flex;
     flex-direction: row;
 }



</style>