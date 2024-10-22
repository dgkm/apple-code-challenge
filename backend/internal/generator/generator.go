package generator

import (
	"fmt"
	"interview/internal/signature"
	"interview/types"
	"math/rand"
	"net"

	"github.com/bxcodec/faker/v3"
)

func randomDomain() string {
	return faker.DomainName()
}

func randomWord() string {
	return faker.Word()
}

func randomComment() string {
	return faker.Sentence()
}

func randomIP() string {
	ip := make(net.IP, 4)
	rand.Read(ip)
	return ip.String()
}

func randomOwner() string {
	return faker.Name()
}

func randomPort() int {
	return rand.Intn(65535-1) + 1
}

func GenerateAsset() types.Asset {
	host := fmt.Sprintf("%s.%s", randomWord(), randomDomain())
	comment := randomComment()
	owner := randomOwner()

	asset := types.Asset{
		Host:    host,
		Comment: comment,
		Owner:   owner,
	}

	asset = *signature.AddAssetSignature(&asset)

	return asset
}

func GenerateIP() types.IP {
	rIp := randomIP()

	ip := types.IP{
		Address: rIp,
	}

	ip = *signature.AddIPSignataure(&ip)
	return ip
}

func GeneratePort() types.Port {
	rPort := randomPort()

	port := types.Port{
		Port: rPort,
	}

	port = *signature.AddPortSignataure(&port)

	return port
}
