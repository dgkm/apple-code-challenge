

load-db:
	cd backend && go run cmd/db/main.go

start-backend:
	cd backend && go run cmd/api/main.go

test-backend:
	cd backend && go test -v "./tests/..."

start-frontend-dev:
	cd frontend && pnpm dev

build-frontend:
	cd frontend && pnpm build

start-frontend:
	cd frontend && pnpm start
