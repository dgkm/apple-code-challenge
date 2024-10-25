package generator

import (
	"math/rand"
	"net"
	"time"

	"github.com/bxcodec/faker/v3"
)

func init() {
	rand.New(rand.NewSource(time.Now().UnixNano()))
}

func RandomDomain() string {
	return faker.DomainName()
}

func RandomWord() string {
	return faker.Word()
}

func RandomComment() string {
	return faker.Sentence()
}

func RandomIP() string {
	ip := make(net.IP, 4)
	rand.Read(ip)
	return ip.String()
}

func RandomOwner() string {
	return faker.Name()
}

func RandomPort() int {
	return rand.Intn(65535-1) + 1
}
