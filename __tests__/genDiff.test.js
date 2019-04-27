import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const testedFiles = [
  ['tree', 'before.json', 'after.json', 'result.txt'],
  ['tree', 'before.yml', 'after.yml', 'result.txt'],
  ['tree', 'before.ini', 'after.ini', 'result.txt'],
  ['tree', 'before-tree.json', 'after-tree.json', 'result-tree.txt'],
  ['plain', 'before-tree.json', 'after-tree.json', 'resultPlain.txt'],
  ['json', 'before-tree.json', 'after-tree.json', 'resultJSON.txt'],
];

test.each(testedFiles)(
  'genDiff - format: %s -> %s',
  (format, beforePath, afterPath, resultPath) => {
    const pathToFileBefore = path.resolve(__dirname, `__fixtures__/${beforePath}`);
    const pathToFileAfter = path.resolve(__dirname, `__fixtures__/${afterPath}`);
    const pathToFileResult = path.resolve(__dirname, `__fixtures__/${resultPath}`);
    const result = fs.readFileSync(pathToFileResult, 'utf8').trim();

    expect(genDiff(pathToFileBefore, pathToFileAfter, format)).toEqual(result);
  },
);
