package env

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func getVariable(key string) string {
	configFile := os.Getenv("CONFIG_FILE")
	if configFile == "" {
		configFile = ".env"
	}
	err := godotenv.Load(configFile)

	if err != nil {
		log.Fatalf("Error loading .env file: %v\n", err)
	}

	return os.Getenv(key)
}

func Get(key string) string {
	return getVariable(key)
}

func GetInt(key string) int {
	i, err := strconv.Atoi(getVariable(key))
	if err != nil {
		log.Fatalf("Error getting Int value for %s\n", key)
		return 0
	}
	return i
}

func GetBool(key string) bool {
	b, err := strconv.ParseBool(getVariable(key))
	if err != nil {
		log.Fatalf("Error getting Int value for %s\n", key)
		return false
	}
	return b
}
