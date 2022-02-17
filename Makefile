#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>
SHELL = /bin/sh

docker_bin := $(shell command -v docker 2> /dev/null)

PACKAGE_VERSION := $(shell git describe --tags $$(git rev-list --tags --max-count=1))


--------------------: ## --------------------

CONTAINER_NAME := node-express-skeleton

PREFIX := klimby

--------------------: ## --------------------

.DEFAULT_GOAL := help

.PHONY: help push build build-no-cache build-dev create create-no-cache

--------------------: ## --------------------

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

--------------------: ## --------------------

up: ## Запуск (база данных в контейнере)
	@$(docker_bin) compose -f ./docker-test/docker-compose.yml up

down: ## Остановка систем, база данных в контейнере
	@$(docker_bin) compose -f ./docker-test/docker-compose.yml down

--------------------: ## ------------------------------
--------------------: ## *** PUSH PULL LOGIN ***
--------------------: ## ------------------------------


push: ## Отправить на хаб
	$(docker_bin) push $(PREFIX)/$(CONTAINER_NAME):$(PACKAGE_VERSION)
	$(docker_bin) push $(PREFIX)/$(CONTAINER_NAME):latest

--------------------: ## ------------------------------
--------------------: ## *** BUILD CREATE ***
--------------------: ## ------------------------------

build: create push ## Создать с использованием кэша и отправить на хаб

build-no-cache: create-no-cache push ## Создать без учета кэша и отправить на хаб

build-dev: ## Dev сборка
	$(docker_bin) build --no-cache --label version=$(PACKAGE_VERSION) -t $(PREFIX)/$(CONTAINER_NAME):dev .

create: ## Создать с использованием кэша
	$(docker_bin) build --label version=$(PACKAGE_VERSION) -t $(PREFIX)/$(CONTAINER_NAME):$(PACKAGE_VERSION) -t $(PREFIX)/$(CONTAINER_NAME):latest .

create-no-cache: ## Создать без учета кэша
	$(docker_bin) build --no-cache --label version=$(PACKAGE_VERSION) -t $(PREFIX)/$(CONTAINER_NAME):$(PACKAGE_VERSION) -t $(PREFIX)/$(CONTAINER_NAME):latest .

--------------------: ## ------------------------------
--------------------: ## *** ВХОДЫ В КОНСОЛЬ КОНТЕЙНЕРОВ ***
--------------------: ## контейнеры запущены, для выхода набрать exit
--------------------: ## ------------------------------

enter: ## Вход в контейнер
	@printf "%b" "$(COM_COLOR)=========== Вход в контейнер php ===========\n$(NO_COLOR)"
	@$(docker_bin)  exec -i -t  node-skeleton /bin/sh
