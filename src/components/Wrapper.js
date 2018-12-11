// @noflow
import React, { Component } from 'react';
import ThemeProvider from '@quid/theme';
import styled from '@emotion/styled/macro';

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
  border-bottom: 1px solid ${props => props.theme.disabled};
`;

export default class Wrapper extends Component {
  state = { theme: 'light' };

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
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
      </ThemeProvider>
    );
  }
}
