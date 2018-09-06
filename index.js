import { shallow } from "enzyme";
import React from "react";

export function shallowForTarget(...args) {
  const root = shallow(...args);
  return shallowTargetOrInput(root);
}

function shallowTargetOrInput(root) {
  const { shallowTarget, shallowTargetFound } = findShallowTarget(root);
  return isNonReactComponentTarget(root)
    ? root
    : shallowTargetFound
      ? shallowTargetOrInput(shallowTarget.shallow())
      : root;
}

function isNonReactComponentTarget(input) {
  return (
    input.props().shallowTarget === true && typeof input.type() === "string"
  );
}

function findShallowTarget(shallowWrapperToSearch) {
  const match = shallowWrapperToSearch
    .findWhere(elem => elem.props().shallowTarget === true)
    .first();
  return {
    shallowTarget: match,
    shallowTargetFound: !!match.length
  };
}
