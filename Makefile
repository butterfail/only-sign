.DEFAULT_GOAL := help
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: vendor/autoload.php ## Install project
	$(php) composer install --optimize-autoloader
	make migrate

.PHONY: migration
migration: vendor/autoload.php ## Generate migration
	symfony console make:migration

.PHONY: migrate
migrate: vendor/autoload.php ## Migrate database
	symfony console doctrine:migrations:migrate -q

.PHONY: seed
seed: vendor/autoload.php ## Seed database
	make migrate
	symfony console app:seed -q

.PHONY: tests
tests: vendor/autoload.php public/assets ## Run tests
	$(php) bin/phpunit --testdox

# -----------------------------------
# Dependencies
# -----------------------------------
vendor/autoload.php: composer.lock
	$(php) composer install

node_modules: pnpm-lock.yaml
	$(node) pnpm install

public/assets: node_modules
	$(node) pnpm run build
