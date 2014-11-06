# vim: ts=2 sw=2 noexpandtab

SHELL := /bin/bash

# $(call print,color,message)
define print
	@tput setaf $1
	@echo -e $2
	@tput sgr0
endef

build:
	$(call print,4,Running browserify...)
	-@rm -rf dist
	-@mkdir dist
	-@browserify lib/index.js --standalone PacklinkSDK > dist/packlink-js-sdk.js
	$(call print,2,Done)

install:
	$(call print,4,Installing...)
	-@npm install

.PHONY: build
