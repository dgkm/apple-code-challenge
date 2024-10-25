
CURRENT_DIR := $(shell pwd)

load-db:
	CONFIG_FILE="`pwd`/.env" go run cmd/db/main.go

format:
	~/go/bin/gofumpt -l -w .

lint:
	~/go/bin/golangci-lint run ./...

test:
	CONFIG_FILE="`pwd`/.env" go test -v "./tests/..."

start:
	CONFIG_FILE="`pwd`/.env" go run cmd/api/main.go

build:
	go build -v -o ${CURRENT_DIR}/bin ./...

