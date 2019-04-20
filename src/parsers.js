import yaml from 'js-yaml';

export default (ext) => {
  const parsers = {
    '.json': () => JSON.parse,
    '.yml': () => yaml.safeLoad,
  };
  return parsers[ext];
};
