
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

  export interface Pagination {
    page: string;
    size: string;
  }

  export interface MetadataType extends Pagination {
    total: number
  }

  export interface ResponseType<T> {
    data: T,
    metadata: MetadataType
  }