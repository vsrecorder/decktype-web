.PHONY: docker-build-and-push
docker-build-and-push:
	sudo docker build --no-cache -t vsrecorder/decktype-web:latest . && sudo docker push vsrecorder/decktype-web:latest
