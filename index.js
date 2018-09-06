import { shallow } from "enzyme";
import React from "react";

export function shallowForTarget({ targetPropName = "shallowTarget" } = {}) {
  return (...args) => {
    const root = shallow(...args);
    return shallowTargetOrInput(root);
  };

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
      input.props()[targetPropName] === true && typeof input.type() === "string"
    );
  }

  function findShallowTarget(shallowWrapperToSearch) {
    const match = shallowWrapperToSearch
      .findWhere(elem => elem.props()[targetPropName] === true)
      .first();
    return {
      shallowTarget: match,
      shallowTargetFound: !!match.length
    };
  }
}
