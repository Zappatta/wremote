import app from '../modules/ExpressApp/ExpressApp';
import state from '../modules/State/State';
import * as gAuth from '../modules/GoogleAuth/index';

app.get('/rest/checkToken/:token', async (req, res)=>{
    let userInfo = await gAuth.getUserInfo(req.params.token);
    if(userInfo) {

        res.cookie('g_id_token', req.params.token);
        res.status(200).send();
    }
    else {
        res.status(401).send();
    }

});

app.get('/rest/state/', async (req, res)=>{
    res.send(JSON.stringify(state));
});

app.post('/rest/state/', async(req,res)=>{
    state.power = req.body.power;
    state.mode = req.body.mode;
    state.fan = req.body.fan;
    state.desiredTemp= req.body.desiredTemp;
    state.isActionPending = true;
    console.log("state updated by client", state);

    res.status(200).send("OK");
});