import mainRender from './main';
import plainRender from './plain';

const render = {
  mainRender,
  plainRender,
};

export default format => render[format];
