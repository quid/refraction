// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputGroup from '.';

it('provides the expected class names', () => {
  mount(
    <InputGroup>
      {cn => expect(cn).toMatchInlineSnapshot(`"css-eklp95"`)}
      {cn => expect(cn).toMatchInlineSnapshot(`"css-1ts4n50"`)}
      {cn => expect(cn).toMatchInlineSnapshot(`"css-cesvsp"`)}
    </InputGroup>
  );
});

it('applies the expected class names', () => {
  expect(
    mount(
      <InputGroup>
        <span />
        <span />
        <span />
      </InputGroup>
    )
  ).toMatchSnapshot();
});

it("doesn't explodes on unexpected children", () => {
  mount(<InputGroup />);
});
