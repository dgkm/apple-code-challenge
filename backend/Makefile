
CURRENT_DIR := $(shell pwd)

load-db:
	CONFIG_FILE="`pwd`/.env" go run cmd/db/main.go

format:
	~/go/bin/gofumpt -l -w .

lint:
	~/go/bin/golangci-lint run ./...

test:
	CONFIG_FILE="`pwd`/.env" ~/go/bin/gotest -v "./tests/..."

depgraph:
	~/go/bin/godepgraph -s -novendor ./cmd/api | dot -Tpng -o ./diagrams/dependency_graph.png

start-dev:
	~/go/bin/air

start:
	CONFIG_FILE="`pwd`/.env" go run cmd/api/main.go

build:
	go build -v -o ${CURRENT_DIR}/bin ./...

