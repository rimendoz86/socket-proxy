export class Proxy{
    public SourceIP: string;
    public SourcePort: number;
    public TargetIP: string;
    public TargetPort: number;
    constructor(initializer?: Proxy){
        this.SourceIP = initializer.SourceIP;
        this.SourcePort =initializer.SourcePort;
        this.TargetIP = initializer.TargetIP;
        this.TargetPort = initializer.TargetPort;
    }
}
