package main

import (
	"database/sql"
	"fmt"
	"interview/internal/signature"
	"interview/types"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

const dbFileName = "assets.db"

func main() {
	db, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	router := gin.New()
	router.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s %dbytes %s\"\n",
			param.ClientIP,
			param.TimeStamp.Format(time.RFC1123),
			param.Method,
			param.Path,
			param.Request.Proto,
			param.StatusCode,
			param.Latency,
			param.BodySize,
			param.ErrorMessage,
		)
	}))

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.GET("/assets", func(c *gin.Context) {
		assetID := c.Query("id")
		var rows *sql.Rows
		if assetID != "" {
			rows, err = db.Query("SELECT id, host, comment, owner, signature FROM assets WHERE id = ?", assetID)
		} else {
			rows, err = db.Query("SELECT id, host, comment, owner, signature FROM assets limit 500")
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var assets []types.Asset
		for rows.Next() {
			var id int
			var host, comment, owner, assetSignature string
			if err := rows.Scan(&id, &host, &comment, &owner, &assetSignature); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			var ips []types.IP
			ipRows, err := db.Query("SELECT address, signature FROM ips WHERE asset_id = ?", id)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer ipRows.Close()
			for ipRows.Next() {
				var ipAddress, ipSignature string
				if err := ipRows.Scan(&ipAddress, &ipSignature); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				ips = append(ips, types.IP{Address: ipAddress, Signature: ipSignature})
			}

			var ports []types.Port
			portRows, err := db.Query("SELECT port, signature FROM ports WHERE asset_id = ?", id)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			defer portRows.Close()
			for portRows.Next() {
				var portNum int
				var portSignature string
				if err := portRows.Scan(&portNum, &portSignature); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				ports = append(ports, types.Port{Port: portNum, Signature: portSignature})
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

			processedAsset := *signature.GenerateAssetSignatures(&asset)

			assets = append(assets, processedAsset)
		}

		c.JSON(http.StatusOK, assets)
	})

	router.Run(":8080")
}
