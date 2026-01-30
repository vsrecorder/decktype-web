.PHONY: docker-build-and-push
docker-build-and-push:
	docker build --no-cache -t vsrecorder/decktype-web:latest . && docker push vsrecorder/decktype-web:latest

.PHONY: deploy
deploy:
	docker compose pull && docker compose down && docker compose up -d
