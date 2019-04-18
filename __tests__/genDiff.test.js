import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const file1 = path.resolve(__dirname, '__fixtures__/before.json');
const file2 = path.resolve(__dirname, '__fixtures__/after.json');
const resultPath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(resultPath, 'utf8');

test('genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});
