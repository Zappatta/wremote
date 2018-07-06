import CONFIG from '../../../config/';
const CLIENT_ID = CONFIG.GOOGLE_CLIENT_ID;
console.log('ME CLIENT ID IS', CLIENT_ID);
import GoogleAuth from 'google-auth-library';


export async function getUserInfo(userIdToken) {
    return new Promise((resolve) => {
        let auth = new GoogleAuth;
        let client = new auth.OAuth2(CLIENT_ID, '', '');


        client.verifyIdToken(
            userIdToken,
            CLIENT_ID,
            function (e, login) {
                if (login) {
                    resolve(login.getPayload());
                }
                else {
                  console.log('no auth by google', e);
                    resolve();
                }
            });

    })

}

export async function checkForAuthorization(userIdToken) {
    let userInfo = await getUserInfo(userIdToken);

    if (userInfo) {

        if(CONFIG.AUTHORIZED_GOOGLE_EMAILS.indexOf(userInfo['email']) !== -1){
            return true;
        }
    }



    return false;
}
