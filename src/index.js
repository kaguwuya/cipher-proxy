const { ProxyServer } = require('anyproxy');
const webPort = process.env.WEBPORT || 8002

const proxy = new ProxyServer({
    port: process.env.PORT || 8000,
    webInterface : {
        enable: true,
        port: webPort
    },
    forceProxyHttps: false,
    dangerouslyIgnoreUnauthorized: true,
    silent: false
});

proxy.start()