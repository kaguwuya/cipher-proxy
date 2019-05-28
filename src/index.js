require('dotenv').config();
const { ProxyServer } = require('anyproxy');
const ngrok = require('ngrok')
const webPort = process.env.PORT || 8002
const localPort = 8000;

const proxy = new ProxyServer({
    port: localPort,
    webInterface : {
        enable: true,
        port: webPort
    },
    rule: require('./webmaster.js'),
    forceProxyHttps: false,
    dangerouslyIgnoreUnauthorized: true,
    silent: true
});

proxy.start();

ngrok.connect({
    proto: 'tcp',
    addr: localPort,
    authtoken: process.env.NGROK_TOKEN
}).then(url => console.log(`URL : ${url}`))