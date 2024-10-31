package database

import (
	"fmt"

	"interview/internal/types"
)

const (
	findPortsByAssetIdQuery = "SELECT port, signature FROM ports WHERE asset_id = ?"
)

func (db *Database) FindPortsByAssetId(id int) ([]types.Port, error) {
	return db.getPorts(findPortsByAssetIdQuery, id)
}

func (db *Database) getPorts(query string, args ...any) ([]types.Port, error) {
	var ports []types.Port
	portRows, err := db.Pool.Query(query, args...)
	if err != nil {
		return ports, fmt.Errorf("error loading ports, %w", err)
	}
	defer portRows.Close()
	for portRows.Next() {
		var portNum int
		var portSignature string
		if err := portRows.Scan(&portNum, &portSignature); err != nil {
			return ports, fmt.Errorf("error loading port, %w", err)
		}

		port := types.Port{
			Port:      portNum,
			Signature: portSignature,
		}

		ports = append(ports, port)
	}
	return ports, nil
}
