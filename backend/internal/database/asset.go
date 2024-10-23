package database

import (
	"fmt"
	"interview/internal/types"
)

const (
	getAllAssets     = "SELECT id, host, comment, owner, signature FROM assets order by host desc limit 500 offset 20"
	getAllAssetsById = "SELECT id, host, comment, owner, signature FROM assets WHERE id = ? order by host asc"
)

func (db *Database) GetAllAssetsById(assetID string) ([]types.Asset, error) {
	return db.getAssets(getAllAssetsById, assetID)
}

func (db *Database) GetAllAssets() ([]types.Asset, error) {
	return db.getAssets(getAllAssets)
}

func (db *Database) getAssets(query string, args ...any) ([]types.Asset, error) {
	var assets []types.Asset

	rows, err := db.Pool.Query(query, args...)

	if err != nil {
		return assets, fmt.Errorf("error loading assets, %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var host, comment, owner, assetSignature string
		if err := rows.Scan(&id, &host, &comment, &owner, &assetSignature); err != nil {
			return assets, err
		}

		var ips []types.IP
		ips, err = db.FindIPsByAssetId(id)
		if err != nil {
			return assets, fmt.Errorf("error loading asset ips, %w", err)
		}

		var ports []types.Port
		ports, err = db.FindPortsByAssetId(id)
		if err != nil {
			return assets, fmt.Errorf("error loading asset ports, %w", err)
		}

		asset := types.Asset{
			ID:        id,
			Host:      host,
			Comment:   comment,
			Owner:     owner,
			IPs:       ips,
			Ports:     ports,
			Signature: assetSignature,
		}

		asset.AddAssetSignatures()

		assets = append(assets, asset)
	}
	return assets, nil
}
