import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathToJsonFile1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToJsonFile2 = path.resolve(__dirname, '__fixtures__/after.json');
const pathToYmlFile1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToYmlFile2 = path.resolve(__dirname, '__fixtures__/after.yml');
const pathToIniFile1 = path.resolve(__dirname, '__fixtures__/before.ini');
const pathToIniFile2 = path.resolve(__dirname, '__fixtures__/after.ini');

const pathToTreeFile1 = path.resolve(__dirname, '__fixtures__/before-tree.json');
const pathToTreeFile2 = path.resolve(__dirname, '__fixtures__/after-tree.json');

const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const resultPathTree = path.resolve(__dirname, '__fixtures__/result-tree.txt');
const result = fs.readFileSync(resultPath, 'utf8').trim();
const resultTree = fs.readFileSync(resultPathTree, 'utf8').trim();

const resultPathPlain = path.resolve(__dirname, '__fixtures__/resultPlain.txt');
const resultPlain = fs.readFileSync(resultPathPlain, 'utf8').trim();

const resultPathJSON = path.resolve(__dirname, '__fixtures__/resultJSON.txt');
const resultJSON = fs.readFileSync(resultPathJSON, 'utf8').trim();

const testedFiles = [
  [pathToJsonFile1, pathToJsonFile2],
  [pathToYmlFile1, pathToYmlFile2],
  [pathToIniFile1, pathToIniFile2],
];

test.each(testedFiles)(
  'genDiff-%#',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath, 'tree')).toEqual(result);
  },
);

test.each([[pathToTreeFile1, pathToTreeFile2]])(
  'genDiff-tree',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath, 'tree')).toEqual(resultTree);
  },
);

test.each([[pathToTreeFile1, pathToTreeFile2]])(
  'genDiff-plain',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath, 'plain')).toEqual(resultPlain);
  },
);

test.each([[pathToTreeFile1, pathToTreeFile2]])(
  'genDiff-JSON',
  (beforePath, afterPath) => {
    expect(genDiff(beforePath, afterPath, 'json')).toEqual(resultJSON);
  },
);
