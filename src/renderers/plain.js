import _ from 'lodash';

const getString = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const plainRender = (ast) => {
  const diff = (data, parent = []) => data.map((node) => {
    const {
      key, type, value, valueBefore, valueAfter, children,
    } = node;
    switch (type) {
      case 'parent':
        return diff(children, [...parent, key]).filter(_.identity);
      case 'added':
        return `Property '${[...parent, key].join('.')}' was added with value: ${getString(value)}`;
      case 'changed':
        return `Property '${[...parent, key].join('.')}' was updated. From ${getString(valueBefore)} to ${getString(valueAfter)}`;
      case 'removed':
        return `Property '${[...parent, key].join('.')}' was removed`;
      case 'same':
        return null;
      default:
        throw new Error('unknown node type.');
    }
  });
  return _.flatten(diff(ast)).filter(_.identity).join('\n');
};

export default plainRender;
