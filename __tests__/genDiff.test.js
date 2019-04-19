import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const pathToFile1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToFile2 = path.resolve(__dirname, '__fixtures__/after.json');
const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(resultPath, 'utf8');

test('genDiff', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(result);
});
