export class ProxyConfig{
    public SourceIP: string;
    public SourcePort: number;
    public TargetIP: string;
    public TargetPort: number;
    public Listen?: boolean = false;
    public Verbose?: boolean = false;
}