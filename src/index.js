import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parsers from './parsers';

export default (pathToFile1, pathToFile2) => {
  // const obj1 = JSON.parse(fs.readFileSync(path.resolve(pathToFile1), 'utf8'));
  // const obj2 = JSON.parse(fs.readFileSync(path.resolve(pathToFile2), 'utf8'));
  // const obj1 = yaml.safeLoad(fs.readFileSync(path.resolve(pathToFile1), 'utf8'));
  // const obj2 = yaml.safeLoad(fs.readFileSync(path.resolve(pathToFile2), 'utf8'));


  const obj1 = parsers(fs.readFileSync(path.resolve(pathToFile1), 'utf8'));
  const obj2 = parsers(fs.readFileSync(path.resolve(pathToFile2), 'utf8'));

  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));

  // const getFormatFile = (pathToFile) => {
  //   const ext = path.extname(pathToFile);
  //   const formats = {
  //     '.json': () => JSON.parse(),
  //     '.yml': () => yaml.safeLoad(),
  //   };
  // };


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
