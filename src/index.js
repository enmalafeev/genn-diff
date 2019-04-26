import parse from './parsers';
import getRender from './renderers';
import buildAst from './buildAst';

export default (pathToFile1, pathToFile2, format = 'tree') => {
  const obj1 = parse(pathToFile1);
  const obj2 = parse(pathToFile2);
  const render = getRender(format);
  const ast = buildAst(obj1, obj2);
  return render(ast);
};
