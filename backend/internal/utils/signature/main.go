package signature

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

const forceGenerate = false

func GenerateSignature(data string) (string, error) {
	hash := sha256.New()
	_, err := hash.Write([]byte(data))
	if err != nil {
		return "", fmt.Errorf("unable to create hash, %w", err)
	}
	signature := hex.EncodeToString(hash.Sum(nil))
	return signature, nil
}

func ForceGenerate() bool {
	return forceGenerate
}
