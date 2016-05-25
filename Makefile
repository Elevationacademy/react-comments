# Add our local node bin to the path so we can reference commands easily.
NODE_BIN = ./node_modules/.bin
PATH := ${NODE_BIN}:${PATH}

dev:
	# Run a dev server with hot module reloading.
	webpack-dev-server --progress --hot --inline --no-info
