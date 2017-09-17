//express endpoints that will be contacted by the arduino device.
import state from '../modules/State/State';
import app from '../modules/ExpressApp/ExpressApp';

app.get('/UpdateTemp/:newTemp', function(req, res) {
    console.log("Temp updated", req.params.newTemp);
    state.actualTemp = req.params.newTemp;

    state.lastArduinoUpdateTime = new Date().getTime();

    res.status(200).send("ok");
});

app.get('/GetPendingAction/', function(req, res) {
    if(state.isActionPending){
        //power, temp, mdoe, fan
        state.isActionPending = false;
        res.status(200).send(`${state.power},${state.temp},${state.mode},${state.fan}`);

    }
    else {
        res.status(404).send();
    }

});
