#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>
SHELL = /bin/sh

COM_COLOR   = \033[0;34m
OBJ_COLOR   = \033[0;36m
OK_COLOR    = \033[0;32m
ERROR_COLOR = \033[0;31m
WARN_COLOR  = \033[0;33m
NO_COLOR    = \033[m

docker_bin := $(shell command -v docker 2> /dev/null)

docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

npm_bin := $(shell command -v npm 2> /dev/null)

PACKAGE_VERSION := $(shell git describe --tags $$(git rev-list --tags --max-count=1))


--------------------: ## --------------------

CONTAINER_NAME := node-express-skeleton

NGINX_IMAGE := e-nginx

PREFIX := klimby

--------------------: ## --------------------

.DEFAULT_GOAL := help

.PHONY: help login push pull-nginx pull build build-no-cache build-dev create create-no-cache readme

--------------------: ## --------------------

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

--------------------: ## --------------------


--------------------: ## ------------------------------
--------------------: ## *** PUSH PULL LOGIN ***
--------------------: ## ------------------------------


push: ## Отправить на хаб
	$(docker_bin) tag $(PREFIX)/$(CONTAINER_NAME):$(PACKAGE_VERSION)
	$(docker_bin) push $(PREFIX)/$(CONTAINER_NAME):$(PACKAGE_VERSION)
	$(docker_bin) tag $(PREFIX)/$(CONTAINER_NAME):latest
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
