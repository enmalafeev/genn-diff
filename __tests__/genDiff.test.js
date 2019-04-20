import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathToFile1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToFile2 = path.resolve(__dirname, '__fixtures__/after.json');
const pathToYmlFile1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToYmlFile2 = path.resolve(__dirname, '__fixtures__/after.yml');
const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(resultPath, 'utf8');

test('genDiff-json', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});

test('genDiff-yml', () => {
  expect(genDiff(pathToYmlFile1, pathToYmlFile2)).toEqual(result);
});
