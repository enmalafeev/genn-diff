import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parsers from './parsers';

export default (pathToFile1, pathToFile2) => {
  const parse = (pathToFile) => {
    const ext = path.extname(pathToFile);
    const parseFunction = parsers(ext);
    const dataFile = fs.readFileSync(path.resolve(pathToFile), 'utf8');
    const parsedObj = parseFunction(dataFile);
    return parsedObj;
  };

  const obj1 = parse(pathToFile1);
  const obj2 = parse(pathToFile2);

  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));

  const diff = uniqKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`];
      }
    }
    if (!_.has(obj1, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
    if (!_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    return [...acc, `  ${key}: ${obj1[key]}`];
  }, []).join('\n');
  return `{\n${diff}\n}`;
};
