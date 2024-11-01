package signature

import (
	"testing"

	"interview/internal/utils/signature"
)

func TestGenerateSignature(t *testing.T) {
	data := "test input"
	sign, _ := signature.GenerateSignature(&data)
	if *sign == "" {
		t.Errorf("Result was incorrect, got: %s, want: shouldn't not empty", sign)
	}
}
