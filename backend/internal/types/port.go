package types

import (
	"fmt"
	"interview/internal/utils/generator"
	"interview/internal/utils/signature"
)

type Port struct {
	Port      int    `json:"Port"`
	Signature string `json:"Signature"`
}

func GeneratePort() Port {
	rPort := generator.RandomPort()

	port := Port{
		Port: rPort,
	}

	port.AddSignataure()

	return port
}

func (port *Port) AddSignataure() error {
	if len(port.Signature) == 0 || signature.ForceGenerate() {
		portData := fmt.Sprintf("%d", port.Port)

		signature, err := signature.GenerateSignature(portData)

		if err != nil {
			return fmt.Errorf("unable to add signature to Port, %w", err)
		}

		port.Signature = signature

	}
	return nil
}
