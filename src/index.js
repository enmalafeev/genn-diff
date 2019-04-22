import _ from 'lodash';
import parse from './parsers';
import render from './renderers/render-json';

export default (pathToFile1, pathToFile2) => {
  const obj1 = parse(pathToFile1);
  const obj2 = parse(pathToFile2);

  // const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));

  // const diff = uniqKeys.reduce((acc, key) => {
  //   if (_.has(obj1, key) && _.has(obj2, key)) {
  //     if (obj1[key] !== obj2[key]) {
  //       return [...acc, `  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`];
  //     }
  //   }
  //   if (!_.has(obj1, key)) {
  //     return [...acc, `  + ${key}: ${obj2[key]}`];
  //   }
  //   if (!_.has(obj2, key)) {
  //     return [...acc, `  - ${key}: ${obj1[key]}`];
  //   }
  //   return [...acc, `  ${key}: ${obj1[key]}`];
  // }, []).join('\n');
  // return `{\n${diff}\n}`;

  const buildAst = (obj1, obj2) => {
    const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
    return uniqKeys.reduce((acc, key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return [...acc, {
          key,
          value: obj1[key],
          children: buildAst(obj1[key], obj2[key]),
          type: 'parent',
        }];
      }
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] !== obj2[key]) {
          return [...acc, {
            key,
            valueBefore: obj1[key],
            valueAfter: obj2[key],
            type: 'changed',
          }];
        }
      }
      if (!_.has(obj1, key)) {
        return [...acc, {
          key,
          value: obj2[key],
          type: 'added',
        }];
      }
      if (!_.has(obj2, key)) {
        return [...acc, {
          key,
          value: obj1[key],
          type: 'removed',
        }];
      }
      return [...acc, {
        key,
        value: obj1[key],
        type: 'same',
      }];
    }, []);
  };
  const ast = buildAst(obj1, obj2);
  return render(ast);
  // return ast;
};
