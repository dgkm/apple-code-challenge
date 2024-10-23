package types

import (
	"fmt"
	"interview/internal/utils/generator"
	"interview/internal/utils/signature"
)

type IP struct {
	Address   string
	Signature string
}

func GenerateIP() IP {
	rIp := generator.RandomIP()

	ip := IP{
		Address: rIp,
	}

	ip.AddSignataure()
	return ip
}

func (ip *IP) AddSignataure() error {
	if len(ip.Signature) == 0 || signature.ForceGenerate() {
		ipData := ip.Address

		signature, err := signature.GenerateSignature(ipData)

		if err != nil {
			return fmt.Errorf("unable to add signature to IP, %w", err)
		}

		ip.Signature = signature

	}
	return nil
}
