export class Message 
{
    public Buffer: Buffer;
    public Text: string;
    constructor(data: ArrayBuffer | SharedArrayBuffer){
        this.Buffer = Buffer.from(data);
        this.Text = this.Buffer.toString();
        console.log(this.Text)
    }
    getMessageCode(){
        if(!this.Text) return;
        let messageText = this.Text.split(' ')[0];
        return messageText;
    }
}

export class TargetServer{
    public Name: string;
    public IP: string;
    public Port: number;
    constructor(name: string, iP: string, port: number){
        this.Name = name;
        this.IP = iP;
        this.Port = port;
    }
}