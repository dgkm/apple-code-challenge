package database

import (
	"fmt"
	"strconv"
	"sync"

	"interview/internal/env"
	"interview/internal/types"
)

var (
	enableConcurreny = env.GetBool("CONCURRENCY_ENABLED")
	forceMaxPageSize = env.GetBool("FORCE_MAX_PAGE_SIZE")
	maxPageSize      = env.GetInt("MAX_PAGE_SIZE")
)

// TODO: if supported convert queries to work on composite left join

const (
	getAssetCount           = "SELECT count(1) cnt FROM assets"
	getAssetCountWithSearch = "SELECT count(1) cnt FROM assets where host like ?"
	getAllAssets            = "SELECT id, host, comment, owner, signature FROM assets order by host asc limit ? offset ?"
	getAllAssetsWithSearch  = "SELECT id, host, comment, owner, signature FROM assets where host like ? order by host asc limit ? offset ?"
	getAllAssetsById        = "SELECT id, host, comment, owner, signature FROM assets WHERE id = ? order by host asc"
)

func getLikeSearchTerm(searchTerm string) string {
	return "%" + searchTerm + "%"
}

func (db *Database) GetAssetsCount(searchTerm string) (int, error) {
	if searchTerm != "" {
		return db.getAssetCount(getAssetCountWithSearch, getLikeSearchTerm(searchTerm))
	} else {
		return db.getAssetCount(getAssetCount)
	}
}

func (db *Database) GetAllAssets(queryOptions *types.QueryOptions, searchTerm string) ([]types.Asset, error) {
	size, _ := strconv.Atoi(queryOptions.Size)

	if forceMaxPageSize {
		if size > maxPageSize && maxPageSize > 1 && maxPageSize <= 100 {
			size = maxPageSize
			queryOptions.Size = strconv.Itoa(size)
		}
	}

	page, _ := strconv.Atoi(queryOptions.Page)

	if searchTerm != "" {
		return db.getAssets(getAllAssetsWithSearch, getLikeSearchTerm(searchTerm), size, (page-1)*size)
	} else {
		return db.getAssets(getAllAssets, size, (page-1)*size)
	}
}

func (db *Database) GetAllAssetsById(assetID string) ([]types.Asset, error) {
	return db.getAssets(getAllAssetsById, assetID)
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
		var ports []types.Port

		if enableConcurreny {
			var wg sync.WaitGroup

			wg.Add(2)

			ips, err = db.FindIPsByAssetIdSpawn(&wg, id)
			if err != nil {
				return assets, fmt.Errorf("error loading asset ips, %w", err)
			}

			ports, err = db.FindPortsByAssetIdSpawn(&wg, id)
			if err != nil {
				return assets, fmt.Errorf("error loading asset ports, %w", err)
			}

			wg.Wait()
		} else {
			ips, err = db.FindIPsByAssetId(id)
			if err != nil {
				return assets, fmt.Errorf("error loading asset ips, %w", err)
			}

			ports, err = db.FindPortsByAssetId(id)
			if err != nil {
				return assets, fmt.Errorf("error loading asset ports, %w", err)
			}

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

		_ = asset.AddAssetSignatures()

		assets = append(assets, asset)
	}

	if assets == nil {
		assets = make([]types.Asset, 0)
	}

	return assets, nil
}
