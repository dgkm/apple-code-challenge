

load-db:
	cd backend && go run cmd/db/main.go

start-api:
	cd backend && go run cmd/api/main.go

start-dev:
	cd frontend && pnpm dev

build-app:
	cd frontend && pnpm build

start-app:
	cd frontend && pnpm start
