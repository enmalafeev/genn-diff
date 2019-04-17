import fs from 'fs';
import genDiff from '../src';

const file1 = fs.readFileSync('__tests__/__fixtures__/before.json', 'utf8');
const file2 = fs.readFileSync('__tests__/__fixtures__/after.json', 'utf8');
const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

test('genDiff', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});
