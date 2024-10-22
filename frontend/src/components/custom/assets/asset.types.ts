
export interface IPType {
  Address: string;
  Signature: string;
}

export interface PortType {
  Port: number;
  Signature: string;
}

export interface AssetType {
    ID: number;
    Host: string;
    Comment: string;
    Owner: string;
    IPs: IPType[];
    Ports: PortType[];
    Signature: string;
  }