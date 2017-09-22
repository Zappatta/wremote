/**
 * This is a simple and somewhat stupid way to authenticate requests made by the arduino to it's designated endpoints
 * I have a dynamic IP address at home, but use a dynamic DNS servers ( such as https://www.noip.com/ )
 * So this will resolve the DNS to an IP address, and only allow requests from that specific I.P
 * This somewhat offloads security to your dynamic DNS provier. But security is not so important here (no secret data),
 * so simple wins IMHO.
 */

import * as CONFIG from '../config';
import dns from 'dns';

let authorizedAddress;
async function updateAuthorizedAddress(){
    return new Promise((resolve)=>{
        dns.lookup(CONFIG.AUTHORIZED_ARDIUNO_DNS_NAME, (err, address, family)=>{
            if(!err){
                resolve(address);
            }
        })
    })

}

export default async function (req,res,next){

    if(CONFIG.AUTHORIZED_ARDIUNO_DNS_NAME){
        let reqIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if(reqIp !== "::ffff:127.0.0.1" && reqIp !== "127.0.0.1" && authorizedAddress !== reqIp){
            authorizedAddress = await updateAuthorizedAddress();
            if(authorizedAddress !== reqIp){
                res.status(401).send();
                console.log("Unathorized arduino request from", reqIp, "authorized is", authorizedAddress);
                return;
            }
        }
    }
    else {
        console.log("WARNING: No AUTHORIZED_ARDIUNO_DNS_NAME set in config. Arduino Endpoints are not protected")
    }

    return next();

}