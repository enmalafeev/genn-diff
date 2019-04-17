import _ from 'lodash';

export default (pathToFile1, pathToFile2) => {
  const obj1 = JSON.parse(pathToFile1);
  const obj2 = JSON.parse(pathToFile2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const diff = keys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] !== obj2[key]) {
        return [...acc, `+ ${key}: ${obj2[key]}`, `- ${key}: ${obj1[key]}`];
      }
    }
    if (!_.has(obj1, key)) {
      return [...acc, `+ ${key}: ${obj2[key]}`];
    }
    if (!_.has(obj2, key)) {
      return [...acc, `- ${key}: ${obj1[key]}`];
    }
    return [...acc, `${key}: ${obj1[key]}`];
  }, []).join('\n');
  return `{\n${diff}\n}`;
};
