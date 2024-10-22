package signature

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"interview/types"
)

const forceGenerate = false

func GenerateSignature(data string) string {
	hash := sha256.New()
	hash.Write([]byte(data))
	signature := hex.EncodeToString(hash.Sum(nil))
	return signature
}

func AddAssetSignature(asset *types.Asset) *types.Asset {
	if len(asset.Signature) == 0 || forceGenerate {
		data := asset.Host + asset.Comment + asset.Owner
		asset.Signature = GenerateSignature(data)
		fmt.Printf("Generated asset signature: %s \n", asset.Signature)
	}
	return asset
}

func AddIPSignataure(ip *types.IP) *types.IP {
	if len(ip.Signature) == 0 || forceGenerate {
		ipData := ip.Address
		ip.Signature = GenerateSignature(ipData)
	}
	return ip
}

func AddPortSignataure(port *types.Port) *types.Port {
	if len(port.Signature) == 0 || forceGenerate {
		portData := fmt.Sprintf("%d", port.Port)
		port.Signature = GenerateSignature(portData)
	}
	return port
}

func GenerateAssetSignatures(asset *types.Asset) *types.Asset {

	newAsset := AddAssetSignature(asset)

	for i, ip := range newAsset.IPs {
		newAsset.IPs[i] = *AddIPSignataure(&ip)
	}

	for i, port := range newAsset.Ports {
		newAsset.Ports[i] = *AddPortSignataure(&port)
	}

	return newAsset
}
