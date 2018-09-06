import React from "react";
import { shallowForTarget } from "./";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

test("basic shallow render 1", () => {
  expect(shallowForTarget("shallowTarget")(<div className="red">Hello</div>))
    .toMatchInlineSnapshot(`
<div
  className="red"
>
  Hello
</div>
`);
});

test("basic shallow render 1 (no options)", () => {
  expect(shallowForTarget()(<div className="red">Hello</div>))
    .toMatchInlineSnapshot(`
<div
  className="red"
>
  Hello
</div>
`);
});

test("basic shallow render 1 (default target)", () => {
  expect(shallowForTarget({})(<div className="red">Hello</div>))
    .toMatchInlineSnapshot(`
<div
  className="red"
>
  Hello
</div>
`);
});

test("basic shallow render 2", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div className="red">
        <div className="blue">Hello</div>
      </div>
    )
  ).toMatchInlineSnapshot(`
<div
  className="red"
>
  <div
    className="blue"
  >
    Hello
  </div>
</div>
`);
});

test("basic shallow render 3", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div shallowTarget className="red">
        Hello
      </div>
    )
  ).toMatchInlineSnapshot(`
<div
  className="red"
  shallowTarget={true}
>
  Hello
</div>
`);
});

test("one level down shallow render", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div className="red">
        <div className="blue" shallowTarget>
          Hello
        </div>
      </div>
    )
  ).toMatchInlineSnapshot(`
<div
  className="blue"
  shallowTarget={true}
>
  Hello
</div>
`);
});

test("two levels down shallow render 1", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div className="red">
        <div className="blue">
          <div className="green" shallowTarget>
            Hello
          </div>
        </div>
      </div>
    )
  ).toMatchInlineSnapshot(`
<div
  className="green"
  shallowTarget={true}
>
  Hello
</div>
`);
});

test("two levels down shallow render 2", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div className="red">
        <div className="blue">
          <div className="green" shallowTarget>
            <List className="purple">Hello</List>
          </div>
        </div>
      </div>
    )
  ).toMatchInlineSnapshot(`
<div
  className="green"
  shallowTarget={true}
>
  <List
    className="purple"
  >
    Hello
  </List>
</div>
`);
});

test("three levels down shallow render component", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div className="red">
        <div className="blue">
          <div className="green">
            <List className="purple" shallowTarget>
              Hello
            </List>
          </div>
        </div>
      </div>
    )
  ).toMatchInlineSnapshot(`
<ul>
  <li>
    One
  </li>
</ul>
`);
});

test("complex nest", () => {
  expect(
    shallowForTarget("shallowTarget")(
      <div className="red">
        <div className="blue">
          <Provider>
            <ListWrapper shallowTarget>Hello</ListWrapper>
          </Provider>
        </div>
      </div>
    )
  ).toMatchInlineSnapshot(`
<ul>
  <li>
    One
  </li>
</ul>
`);
});

const List = () => (
  <ul>
    <li>One</li>
  </ul>
);

const ListWrapper = ({ children }) => <List shallowTarget>{children}</List>;

const Provider = ({ children }) => children;
