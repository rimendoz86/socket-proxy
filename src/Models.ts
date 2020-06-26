export class ProxyConfig{
    public SourceIP: string;
    public SourcePort: number;
    public TargetIP: string;
    public TargetPort: number;
    public Listen?: boolean = false;
    public Verbose?: boolean = false;
    constructor(initializer?: ProxyConfig){
        this.SourceIP = initializer.SourceIP;
        this.SourcePort = initializer.SourcePort;
        this.TargetIP = initializer.TargetIP;
        this.TargetPort = initializer.TargetPort;
    }
}