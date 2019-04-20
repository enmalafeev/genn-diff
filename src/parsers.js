import yaml from 'js-yaml';
import ini from 'ini';

export default (ext) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parsers[ext];
};
