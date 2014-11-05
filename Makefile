# vim: ts=2 sw=2 noexpandtab

SHELL        := /bin/bash

# $(call print,color,message)
define print
	@tput setaf $1
	@echo -e $2
	@tput sgr0
endef

build:
	$(call print,4,Running browserify...)
	-@browserify lib/index.js --standalone PacklinkSDK > packlink-js-sdk.js
	$(call print,2,Done)

install:
	$(call print,4,Installing...)
	-@npm install

.PHONY: build
