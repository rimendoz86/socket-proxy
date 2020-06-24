import * as net from 'net';
import { Message, TargetServer } from './Models';

export class SocketProxy {
    public Message: Message | undefined;
    public SocketClient: net.Socket | undefined;
    public SMTPTarget = new TargetServer('localhost','127.0.0.1', 25)

    constructor() {
        this.Start()
    }

    public Start() {
        const server = net.createServer((socket) => {

            var client: net.Socket = this.CreateClient(this.SMTPTarget.IP, this.SMTPTarget.Port);

            var checkForNewClient = (message: string) => {
                if (message.indexOf('EHLO') < 0) return client;
                var targetServer: string = message.split(' ')[1]
                if(targetServer.indexOf(this.SMTPTarget.IP) >= 0) return client;

                client.end();
                let newTargetServer = new TargetServer('newServer','127.0.0.1', 1025);
                return this.CreateClient(newTargetServer.Name,newTargetServer.Port)
            }

            let socketRespond = (message: string) => {
                socket.write(message, err => {
                    if (err) console.log(err);
                })
            }

            socket.on('data', data => {
                console.log(socket.localAddress);
                //client = checkForNewClient(this.DatatoString(data))
                client.write(data.toString());
            })

            socket.on('end', () => {
                client.end()
            })

            client.on('data', (data) => {
                socketRespond(this.DatatoString(data))
            });

            client.on('end', () => {
                socket.end()
            });

        }).on('error', (err) => {
            // Handle errors here.
            throw err;
        });

        server.listen(1025, "127.0.0.1", () => {
            console.log('opened server on', server.address());
        });
    }
    CreateClient(iP: string, port: number): net.Socket {
        return net.createConnection(port, iP, () => {
            // 'connect' listener
        });
    }

    DatatoString(data: ArrayBuffer | SharedArrayBuffer) {
        return Buffer.from(data).toString();
    }
}
new SocketProxy()

