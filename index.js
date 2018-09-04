import { shallow } from "enzyme";

export function shallowForTarget(...args) {
  const root = shallow(...args);
  const match = root.findWhere(elem => elem.props().shallowTarget === true);
  return match.length ? match.shallow() : root;
}
