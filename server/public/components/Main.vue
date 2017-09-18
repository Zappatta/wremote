<template>
    <v-app>
    <div class="'main">
        <div class="topDisplay">
            <div class="actualTemp">
                {{actualTemp}}
                <br>
                <span class="last-update-time" v-if="lastUpdateDiff > (30 * 1000)">
                    updated {{lastUpdateDiffInWords}}
                </span>
            </div>
            <hr>
            <div class="desiredTemp">
                {{desiredTemp}}
                <button @click="desiredTemp++">Up</button>
                <button @click="desiredTemp--">Down</button>
            </div>
        </div>
        <div class="control">
            <div class="power">
                <v-switch v-model="power"></v-switch>
                <label for="chkPower">Power</label><input type="checkbox" id="chkPower" v-model="power">
            </div>
            <label for="selFan">Fan</label>
            <select id="selFan" v-model="fan">
                <option value="0">Auto</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select><br>
            <label for="selMode">Mode</label>
            <select id="selMode" v-model="mode">
                <option value="0">Auto</option>
                <option value="1">Cold</option>
                <option value="2">Dry</option>
                <option value="3">Fan</option>
                <option value="4">Heat</option>
            </select>
        </div>
        <button @click="updateServerWithState()">send</button>
    </div>
    </v-app>
</template>
<script>
    import Vue from 'vue';
    import moment from 'moment';
    import VApp from "../../node_modules/vuetify/src/components/VApp/VApp.vue";
    import VSwitch from "../../node_modules/vuetify/src/components/VSwitch/VSwitch.vue";

    export default {
        components: {
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