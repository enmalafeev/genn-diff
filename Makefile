install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

publish:
	npm publish

test: 
	npm run test

watch:
	npm run watch
	
lint:
	npx eslint .