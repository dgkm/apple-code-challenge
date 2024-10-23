package types

import (
	"fmt"
	"interview/internal/utils/generator"
	"interview/internal/utils/signature"
)

type Asset struct {
	ID        int
	Host      string
	Comment   string
	Owner     string
	IPs       []IP
	Ports     []Port
	Signature string
}

func GenerateAsset() Asset {
	host := fmt.Sprintf("%s.%s", generator.RandomWord(), generator.RandomDomain())
	comment := generator.RandomComment()
	owner := generator.RandomOwner()

	asset := Asset{
		Host:    host,
		Comment: comment,
		Owner:   owner,
	}

	asset.AddSignature()

	return asset
}

func (asset *Asset) AddSignature() error {
	if len(asset.Signature) == 0 || signature.ForceGenerate() {
		data := asset.Host + asset.Comment + asset.Owner
		signature, err := signature.GenerateSignature(data)

		if err != nil {
			return fmt.Errorf("unable to add signature to Asset, %w", err)
		}

		asset.Signature = signature

		//log.Default().Printf("Generated asset signature: %s \n", asset.Signature)
	}
	return nil
}

func (asset *Asset) AddAssetSignatures() error {

	err := asset.AddSignature()
	if err != nil {
		return err
	}

	for _, ip := range asset.IPs {
		//newAsset.IPs[i] = AddIPSignataure(&ip)
		err = ip.AddSignataure()
		if err != nil {
			return err
		}
	}

	for _, port := range asset.Ports {
		//newAsset.Ports[i] = *AddPortSignataure(&port)
		err = port.AddSignataure()
		if err != nil {
			return err
		}
	}

	return nil
}
