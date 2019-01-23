// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { Calendar } from './styles';

it('works on dark theme', () => {
  expect(
    mount(<Calendar theme={{ current: 'dark', colors: { gray6: 'gray6' } }} />)
  ).toHaveStyleRule('background-color', 'gray6');
});
