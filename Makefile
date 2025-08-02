docker-up:
	docker compose up -d

docker-down:
	docker compose down

todo-list:
	docker exec -it todo-list-php bash
