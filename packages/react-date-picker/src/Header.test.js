// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Header from './Header';

it('works on dark theme', () => {
  expect(
    mount(<Header theme={{ current: 'dark', colors: { gray5: 'gray5' } }} />)
  ).toHaveStyleRule('background-color', 'gray5');
});

it('renders the expected markup', () => {
  const wrapper = mount(<Header year={2017} month={1} day={1} />);
  expect(wrapper.find('Year').prop('children')).toMatchInlineSnapshot(`2017`);
  expect(wrapper.find('Rest').prop('children')).toMatchInlineSnapshot(
    `"Wed, February 1"`
  );
});

it('renders the expected markup', () => {
  const wrapper = mount(<Header />);
  expect(wrapper.find('Year').prop('children')).toMatchInlineSnapshot(`
<span>
   
</span>
`);
  expect(wrapper.find('Rest').prop('children')).toMatchInlineSnapshot(
    `"Invalid Date"`
  );
});
