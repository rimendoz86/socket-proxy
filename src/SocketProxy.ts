import * as net from 'net';
import { ProxyConfig } from './Models';

export class SocketProxy implements ProxyConfig {
    public ServerSocket: net.Server;
    public ClientSocket: net.Socket; 
    readonly SourceIP: string;
    readonly SourcePort: number;
    readonly TargetIP: string;
    readonly TargetPort: number;
    public Verbose: boolean = false;

    constructor(proxyConfig: ProxyConfig) {
        this.Start(proxyConfig)
    }

    public Start(proxy: ProxyConfig) {
        var server = net.createServer((socket) => {

            var client = net.createConnection(proxy.TargetPort, proxy.TargetIP, () => {
                this.Verbose && console.log('Client Socket Opened');
                this._onOpen && this._onOpen();
            });

            socket.on('data', data => {
                this._onData && this._onData(data);
                client.write(data);

            })
            socket.on('connect', () => {
                this.Verbose && console.log('Connection');
            })

            socket.on('end', () => {
                client.end()
            })

            client.on('data', (data) => {
                this._onData && this._onData(data);
                socket.write(data)
            });

            client.on('end', () => {
                socket.end()
            });
            
            client.on('error', err => {
                this._onError && this._onError(err);
                client.end();
            })
            this.ClientSocket = client;
        }).on('error', (err) => {
            this._onError && this._onError(err);
        });

        server.listen(proxy.SourcePort, proxy.SourceIP, () => {
            this.Verbose && console.log('SocketProxy Opened', proxy);
        });
        this.ServerSocket = server;
    }

    Close(){
        this.ServerSocket.close();
    }
    
    _onData: {(data: Buffer): void};
    OnData(callBack: { (data: Buffer): void; }){
        this._onData = callBack;
        return this;
    }

    _onOpen: {(): void};
    OnOpen(callBack: {(): void; }){
        this._onOpen = callBack;
        return this;
    }

    _onError: {(err: Error): void}
    OnError(callBack: {(err: Error): void}){
        this._onError = callBack;
        return this;
    }
}

