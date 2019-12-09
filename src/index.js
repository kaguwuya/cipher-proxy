require('dotenv').config();
const http = require('http');
const { ProxyServer } = require('anyproxy');
const ngrok = require('ngrok')
const webPort = process.env.PORT || 8002
const localPort = 8000;

const proxy = new ProxyServer({
    port: localPort,
    webInterface : {
        enable: false,
        port: webPort
    },
    rule: require('./webmaster.js'),
    forceProxyHttps: false,
    dangerouslyIgnoreUnauthorized: true,
    silent: true
});

proxy.start();

ngrok.connect({
    proto: 'http',
    addr: localPort,
    authtoken: process.env.NGROK_TOKEN
}).then(url => {
    console.log(`Piping : ${url}`);
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.write(`{ tunnelPath: "${url}" }`);
        res.end()
    }).listen(webPort)
})
