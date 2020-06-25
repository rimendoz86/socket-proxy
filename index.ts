import * as net from 'net';
import {  Proxy } from './Models';
import config from './config.json'

export class SocketProxy {
    public SocketClient: net.Socket | undefined;
    public Proxies = []; 

    constructor() {
        config.proxys.forEach(proxy => {
            let newProxy = this.Start(proxy)
            this.Proxies.push(newProxy)
        });
    }

    public Start(proxy: Proxy) {
        const server = net.createServer((socket) => {

            var client = net.createConnection(proxy.TargetPort, proxy.TargetIP, () => {
                // 'connect' listener
            });

            socket.on('data', data => {
                config.listen && console.log(this.DatatoString(data))
                client.write(data);
            })

            socket.on('end', () => {
                client.end()
            })

            client.on('data', (data) => {
                config.listen && console.log(this.DatatoString(data))
                socket.write(data)
            });

            client.on('end', () => {
                socket.end()
            });
            
            client.on('error', err => {
                console.log(err);
            })

        }).on('error', (err) => {
            // Handle errors here.
            console.log(err);
        });

        server.listen(proxy.SourcePort, proxy.SourceIP, () => {
            console.log('proxy opened', proxy);
        });

        return server;
    }

    DatatoString(data: ArrayBuffer | SharedArrayBuffer) {
        return Buffer.from(data).toString();
    }
}
new SocketProxy()

