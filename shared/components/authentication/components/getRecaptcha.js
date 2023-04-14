import React from "react";
import { View } from "react-native";
import { WebView } from 'react-native-webview';

export default GetRecaptcha = (props) => {
    const onMessage = (data) => {
    
        //here you can put your action to perform(check validation on your server or somthing)
        props.action(data.nativeEvent.data);
    
    };
    
    return <View style={{}}>
    
        <WebView
            style={{height: 0}}
            onMessage={async (e) => await onMessage(e)}
            containerStyle={{height: 0}}
            source={{
                html: `
                <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <title>Title</title>
            <script src="https://www.google.com/recaptcha/api.js?render=6Ld-JYkfAAAAAHDOOVWS4iWciHjsubtVVmEHIKxq"></script>
            <script>
            function onLoad(e) {
             
                grecaptcha.ready(function () {
                    grecaptcha.execute('6Ld-JYkfAAAAAHDOOVWS4iWciHjsubtVVmEHIKxq', {action: 'submit'}).then((token) => {
                        window.ReactNativeWebView.postMessage(token);
                    });
                }) 
            }
            </script>
            </head>
            <body onload="onLoad()">
            </body>
            </html>`
            , baseUrl: 'https://api.playleap.io/',
        }}/>
    
    
    </View>;
    };