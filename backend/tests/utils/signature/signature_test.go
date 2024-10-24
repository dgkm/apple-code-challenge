package signature

import (
	"interview/internal/utils/signature"
	"testing"
)

func TestGenerateSignature(t *testing.T) {
	data := "test input"
	sign, _ := signature.GenerateSignature(data)
	if sign == "" {
		t.Errorf("Result was incorrect, got: %s, want: shouldn't not empty", sign)
	}
}
