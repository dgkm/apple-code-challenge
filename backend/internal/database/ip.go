package database

import (
	"fmt"
	"interview/internal/types"
)

const (
	findIPsByAssetIdQuery string = "SELECT address, signature FROM ips WHERE asset_id = ?"
)

func (db *Database) FindIPsByAssetId(id int) ([]types.IP, error) {
	return db.getIPs(findIPsByAssetIdQuery, id)
}

func (db *Database) getIPs(query string, args ...any) ([]types.IP, error) {
	var ips []types.IP
	ipRows, err := db.Pool.Query(query, args...)
	if err != nil {
		return ips, fmt.Errorf("error loading ip rows, %w", err)
	}
	defer ipRows.Close()
	for ipRows.Next() {
		var ipAddress, ipSignature string
		if err := ipRows.Scan(&ipAddress, &ipSignature); err != nil {
			return ips, fmt.Errorf("error loading ip, %w", err)
		}

		ip := types.IP{
			Address:   ipAddress,
			Signature: ipSignature,
		}

		ips = append(ips, ip)
	}
	return ips, nil
}
