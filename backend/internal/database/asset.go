package database

import (
	"fmt"
	"interview/internal/types"
	"strconv"
)

const (
	getAssetCount    = "SELECT count(1) cnt FROM assets"
	getAllAssets     = "SELECT id, host, comment, owner, signature FROM assets order by host desc limit ? offset ?"
	getAllAssetsById = "SELECT id, host, comment, owner, signature FROM assets WHERE id = ? order by host asc"
)

func (db *Database) GetAssetsCount() (int, error) {
	return db.getAssetCount(getAssetCount)
}

func (db *Database) GetAllAssetsById(assetID string) ([]types.Asset, error) {
	return db.getAssets(getAllAssetsById, assetID)
}

func (db *Database) GetAllAssets(queryOptions types.QueryOptions) ([]types.Asset, error) {
	size, _ := strconv.Atoi(queryOptions.Size)
	page, _ := strconv.Atoi(queryOptions.Page)

	return db.getAssets(getAllAssets, size, (page-1)*size)
}

func (db *Database) getAssetCount(query string, args ...any) (int, error) {
	var count int

	rows, err := db.Pool.Query(query, args...)

	if err != nil {
		return count, fmt.Errorf("error loading assets, %w", err)
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&count); err != nil {
			return count, err
		}
	}
	return count, nil
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
