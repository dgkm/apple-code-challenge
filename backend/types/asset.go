package types

type Asset struct {
	ID        int
	Host      string
	Comment   string
	Owner     string
	IPs       []IP
	Ports     []Port
	Signature string
}

type IP struct {
	Address   string
	Signature string
}

type Port struct {
	Port      int
	Signature string
}
