// @noflow
import React, { Component } from 'react';
import ThemeProvider from '@quid/theme';
import styled from '@emotion/styled/macro';
import { CacheProvider } from '@emotion/core';
import 'what-input';
import emotionCache from './emotionCache';

const EmotionProvider = props => (
  <CacheProvider value={emotionCache} {...props} />
);

const Container = styled.div`
  margin: -16px;
  padding: 16px;
  border-radius: 2px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};
`;

const Label = styled.label`
  display: block;
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid ${props => props.theme.colors.gray1};
`;

export default class Wrapper extends Component {
  state = { theme: 'light' };

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <EmotionProvider>
          <Container>
            <Label>
              <input
                type="checkbox"
                checked={this.state.theme === 'light'}
                onChange={() =>
                  this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light',
                  }))
                }
              />{' '}
              toggle theme ({this.state.theme})
            </Label>
            {this.props.children}
          </Container>
        </EmotionProvider>
      </ThemeProvider>
    );
  }
}
