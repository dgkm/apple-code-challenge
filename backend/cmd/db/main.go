package main

import (
	"log"
	"math/rand"
	"sync"

	"interview/internal/database"
	"interview/internal/types"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	var err error

	db := database.NewDatabase()
	defer db.Pool.Close()

	// Create the tables
	createTablesSQL := `
		CREATE TABLE assets (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			host TEXT NOT NULL,
			comment TEXT,
			owner TEXT NOT NULL,
			signature TEXT
		);

		CREATE TABLE ips (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			asset_id INTEGER,
			address TEXT NOT NULL,
			signature TEXT,
			FOREIGN KEY(asset_id) REFERENCES assets(id)
		);

		CREATE TABLE ports (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			asset_id INTEGER,
			port INTEGER NOT NULL,
			signature TEXT,
			FOREIGN KEY(asset_id) REFERENCES assets(id)
		);`

	_, err = db.Pool.Exec(createTablesSQL)
	if err != nil {
		log.Fatal(err)
	}

	// Prepare statements for inserts
	insertAssetStmt, err := db.Pool.Prepare("INSERT INTO assets(host, comment, owner, signature) VALUES(?, ?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer insertAssetStmt.Close()

	insertIPStmt, err := db.Pool.Prepare("INSERT INTO ips(asset_id, address, signature) VALUES(?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer insertIPStmt.Close()

	insertPortStmt, err := db.Pool.Prepare("INSERT INTO ports(asset_id, port, signature) VALUES(?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer insertPortStmt.Close()

	// Insert data: 100.000 rows
	totalEntries := 10000
	for i := 0; i < totalEntries; i++ {
		// Insert asset
		asset := types.GenerateAsset()
		result, err := insertAssetStmt.Exec(asset.Host, asset.Comment, asset.Owner, asset.Signature)
		if err != nil {
			log.Fatal(err)
		}

		assetID, err := result.LastInsertId()
		if err != nil {
			log.Fatal(err)
		}

		var wg sync.WaitGroup

		wg.Add(2)
		go func() {
			defer wg.Done()
			// Insert related IPs
			for j := 0; j < rand.Intn(3)+1; j++ { // Each asset has 1-3 IPs
				ip := types.GenerateIP()
				_, err := insertIPStmt.Exec(assetID, ip.Address, ip.Signature)
				if err != nil {
					log.Fatal(err)
				}
			}
		}()

		go func() {
			defer wg.Done()
			// Insert related Ports
			for j := 0; j < rand.Intn(5)+1; j++ { // Each asset has 1-5 ports
				port := types.GeneratePort()
				_, err := insertPortStmt.Exec(assetID, port.Port, port.Signature)
				if err != nil {
					log.Fatal(err)
				}
			}
		}()

		wg.Wait()

		if i%500 == 0 {
			log.Printf("Inserted %d/%d entries", i, totalEntries)
		}
	}

	log.Println("Database created and populated successfully")
}
