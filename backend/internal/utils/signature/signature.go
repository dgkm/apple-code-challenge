package signature

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"

	"interview/internal/env"
)

var (
	forceGenerate = env.GetBool("FORCE_GENERATE_SIGNATURE")
)

func GenerateSignature(data *string) (*string, error) {
	hash := sha256.New()
	_, err := hash.Write([]byte(*data))
	if err != nil {
		return nil, fmt.Errorf("unable to create hash, %w", err)
	}
	signature := hex.EncodeToString(hash.Sum(nil))
	return &signature, nil
}

func ForceGenerate() bool {
	return forceGenerate
}
