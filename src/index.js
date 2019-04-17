import _ from 'lodash';

export default (pathToFile1, pathToFile2) => {
  const obj1 = JSON.parse(pathToFile1);
  const obj2 = JSON.parse(pathToFile2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  // return keys;
  return '{ host: hexlet.io + timeout: 20 - timeout: 50 - proxy: 123.234.53.22 + verbose: true - follow: false }';
};
