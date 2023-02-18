export default function init(parentWindow) {
    parentWindow.handshakeDID = false;

    parentWindow.addEventListener('message', (returnValue) => {
//        console.log('what message : ', returnValue);
        if ( returnValue.origin === 'https://dreamid.shenlanmengtu.com' ) {
            let accountInfo = returnValue.data;
            if ( accountInfo != null && accountInfo.didhandshake != undefined ) {
                parentWindow.handshakeDID = true;
//                console.log('handshake success', accountInfo.data);
            } else if ( accountInfo != null && accountInfo.result === 'OK') {
//                    console.log('DID success', accountInfo);
    
                    const event = new CustomEvent("DreamIDSignInOnSuccess", { accountInfo: accountInfo });
                    parentWindow.dispatchEvent(event);                        
                } else {
//                    console.log('DID failed', accountInfo);

                    const event = new CustomEvent("DreamIDSignInOnFailed", { accountInfo: accountInfo });
                    parentWindow.dispatchEvent(event);                        
                }
        }
    });

    console.log('initialized dreamID.');

    return true;
}