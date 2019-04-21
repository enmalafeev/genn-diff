import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const getParseFunc = (ext) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parsers[ext];
};

export default (pathToFile) => {
  const ext = path.extname(pathToFile);
  const parseFunction = getParseFunc(ext);
  const dataFile = fs.readFileSync(path.resolve(pathToFile), 'utf8');
  const parsedObj = parseFunction(dataFile);
  return parsedObj;
};
