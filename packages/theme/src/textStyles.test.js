// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mount } from 'enzyme';
import textStyles from './textStyles';

it('returns a valid CSS', () => {
  expect(textStyles('normal')({ theme: {} }).styles).toMatchSnapshot();
});

it('works with "withFallback" powered styles (css)', () => {
  expect(
    css`
      ${textStyles('link')({ theme: {} })}
    `.styles
  ).toMatchSnapshot();
});

it('works with "withFallback" powered styles', () => {
  const T = styled.div`
    ${textStyles('secondary', 'disabled', 'link', 'highlighted')}
  `;
  expect(mount(<T />)).toMatchSnapshot();
});
