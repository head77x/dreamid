export default function signIn(parentWindow, params) {
    return new Promise( resolve => {
        let DIDURL = 'https://dreamid.shenlanmengtu.com?' + params;
        let loginWindow = parentWindow.open(DIDURL, 'DID SignIn', 'height=800,width=600');

        var timer = setInterval( () => {
            loginWindow.postMessage({
                didhandshake: 'true'
            }, 'https://dreamid.shenlanmengtu.com');

            if ( parentWindow.handshakeDID == true ) {
                clearInterval(timer);
                resolve('start DID signin');
            }

            if (loginWindow.closed) {
                console.log('DID canceled');
                clearInterval(timer);
                resolve('canceled DID signin');
            }
        }, 1000);          
    });
}