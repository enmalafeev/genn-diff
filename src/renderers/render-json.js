import _ from 'lodash';

const countSpaces = depth => ' '.repeat(2 * depth);

const getString = (obj, depth) => {
  const openBreces = countSpaces(depth + 1);
  const closingBraces = countSpaces(depth);
  if (!_.isObject(obj)) return obj;
  return `{\n${_.keys(obj).map(key => `${openBreces}${key}: ${obj[key]}`)}\n${closingBraces}}`;
};

const render = (ast) => {
  const diff = (data, depth = 1) => data.map((node) => {
    const spaces = countSpaces(depth);
    const resultValue = getString(node.value, depth);
    switch (node.type) {
      case 'parent':
        return `${spaces}${node.key}: {\n${_.flatten(diff(node.children, depth + 1)).join('\n')}\n${spaces}}`;
      case 'added':
        return `${spaces}+ ${node.key}: ${resultValue}`;
      case 'changed':
        return [`${spaces}+ ${node.key}: ${getString(node.valueAfter, depth)}`, `${spaces}- ${node.key}: ${getString(node.valueBefore, depth)}`];
      case 'removed':
        return `${spaces}- ${node.key}: ${resultValue}`;
      case 'same':
        return `${spaces}${node.key}: ${resultValue}`;
      default:
        throw new Error('unknown node type.');
    }
  });
  return `{\n${(_.flatten(diff(ast))).join('\n')}\n}`;
};


export default render;
