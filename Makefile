install:
	npm install

start:
	npx babel-node -- dist/bin/gendiff.js

build:
	npm run build

publish:
	npm publish

test: 
	npm run test

watch:
	npm run watch
	
lint:
	npx eslint .