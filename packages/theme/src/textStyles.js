// @flow
import { css } from '@emotion/core';
import wf from './withFallback';

const primaryFontFamily = css`
  font-family: IBM Plex Sans, Lucida Grande, Tahoma, Verdana, Arial, sans-serif;
`;

const secondaryFontFamily = css`
  font-family: IBM Plex Serif, Gudea, Lucida Grande, Tahoma, Verdana, Arial,
    sans-serif;
`;

const styles = {
  xlarge: css`
    font-size: 20px;
    line-height: 1.4;
  `,
  large: css`
    font-size: 16px;
    line-height: 1.5;
  `,
  title: css`
    font-size: 16px;
    line-height: 1.5;
    ${secondaryFontFamily}
  `,
  body: css`
    line-height: 1.57;
    ${secondaryFontFamily}
  `,
  normal: css`
    font-size: 14px;
    line-height: 1.57;
  `,
  bold: css`
    font-weight: bold;
  `,
  regular: css`
    font-weight: normal;
  `,
  secondary: wf(
    props => css`
      color: props.theme.secondary;
    `
  ),
  disabled: wf(
    props => css`
      color: ${props.theme.disabled};
    `
  ),
  link: wf(
    props => css`
      color: ${props.theme.link};
    `
  ),
  highlighted: wf(
    props => css`
      color: ${props.theme.highlighted};
    `
  ),
};

const baseStyle = css`
  ${primaryFontFamily}
  ${styles.normal}
`;

const textStyles = (...ss: Array<string>) =>
  css`
    ${baseStyle};
    ${ss.map(s => styles[s])}
  `;

export default textStyles;
