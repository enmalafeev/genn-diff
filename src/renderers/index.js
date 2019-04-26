import tree from './tree';
import plain from './plain';
import json from './json';

const render = {
  tree,
  plain,
  json,
};

export default format => render[format];
