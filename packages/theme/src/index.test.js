// @flow
import * as React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import * as exps from './index';
import QuidThemeProvider from './index';

it('exports all the expected modules', () => {
  expect(Object.keys(exps)).toMatchInlineSnapshot(`
Array [
  "colors",
  "sizes",
  "textStyles",
  "withFallback",
  "default",
  "themes",
]
`);
});

describe('QuidThemeProvider', () => {
  it('provides a light theme by default', () => {
    const wrapper = shallow(
      <QuidThemeProvider>
        <div />
      </QuidThemeProvider>
    );
    expect(wrapper.find(ThemeProvider).props().theme.current).toBe('light');
  });
});
