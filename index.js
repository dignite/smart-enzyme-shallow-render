import { shallow } from "enzyme";
import React from "react";

export function shallowForTarget(...args) {
  const root = shallow(...args);
  return shallowTargetOrInput(root);
}

function shallowTargetOrInput(input) {
  const { shallowTarget, shallowTargetFound } = containsShallowTarget(input);
  return shallowTargetFound
    ? shallowTargetOrInput(shallowTarget.shallow())
    : input;
}

function containsShallowTarget(shallowWrapperToSearch) {
  const match = shallowWrapperToSearch
    .findWhere(elem => elem.props().shallowTarget === true)
    .first();
  return {
    shallowTarget: match,
    shallowTargetFound: !!match.length
  };
}
