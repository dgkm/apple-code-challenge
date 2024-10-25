package types

import (
	"testing"

	"interview/internal/types"
)

func TestGenerateAsset(t *testing.T) {
	asset := types.GenerateAsset()
	if asset.Signature == "" {
		t.Errorf("Result was incorrect, got: %s, want: shouldn't not empty", asset.Signature)
	}
}
