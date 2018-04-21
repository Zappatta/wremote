//Middleware that makes sure all requests to API calls are authenticated as we don't want unauthorized people
//issuing commands.

const EXCLUDED_URLS= [/checkToken/];//regexps only please

import * as gAuth from '../modules/GoogleAuth/';
import * as CONFIG from '../../config';

export default async function (req,res,next){
    let isExcluded = false;
    EXCLUDED_URLS.forEach(function(item){
        if(item.test(req.path)){
            isExcluded = true;
        }
    });
    if(isExcluded){
        return next();//url is expluded;
    }

    let userToken = req.cookies[CONFIG.G_ID_TOKEN_COOKIE_NAME];
    if(userToken) {
        let isVerified = await gAuth.checkForAuthorization(userToken);


        if (isVerified) {
            return next();
        }
    }

    console.log("Auth middleware denied access for token", userToken);
    res.status(401).send();


};

