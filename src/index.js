import fs from 'fs';
import path from 'path';
import getParseFunc from './parsers';
import getRender from './renderers';
import buildAst from './buildAst';

export default (pathToFile1, pathToFile2, format = 'tree') => {
  const parse = getParseFunc(path.extname(pathToFile1));
  const dataFile1 = fs.readFileSync(path.resolve(pathToFile1), 'utf8');
  const dataFile2 = fs.readFileSync(path.resolve(pathToFile2), 'utf8');
  const obj1 = parse(dataFile1, 'utf8');
  const obj2 = parse(dataFile2, 'utf8');
  const render = getRender(format);
  const ast = buildAst(obj1, obj2);
  return render(ast);
};
