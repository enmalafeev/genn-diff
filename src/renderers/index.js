import mainRender from './render-json';
import plainRender from './plain';

const render = {
  mainRender,
  plainRender,
};

export default format => render[format];
