// @flow
import { css } from '@emotion/core';
import { withFallback as wf } from '.';

const primaryFontFamily = [
  'Asap',
  'Lucida Grande',
  'Tahoma',
  'Verdana',
  'Arial',
  'sans-serif',
];

const secondaryFontFamily = [
  'Georgia',
  'Gudea',
  'Lucida Grande',
  'Tahoma',
  'Verdana',
  'Arial',
  'sans-serif',
];

const styles = {
  xlarge: css`
    font-size: 20px;
    line-height: 1.3;
  `,
  large: css`
    font-size: 15px;
    line-height: 1.27;
  `,
  title: css`
    font-family: ${secondaryFontFamily.join(' ')};
    font-size: 15px;
    line-height: 1.6;
  `,
  body: css`
    font-family: ${secondaryFontFamily.join(' ')};
    line-height: 1.54;
  `,
  normal: css`
    font-size: 13px;
    line-height: 1.23;
  `,
  bold: css`
    font-weight: bold;
  `,
  regular: css`
    font-weight: normal;
  `,
  secondary: css`
    color: ${wf(props => props.theme.secondary)};
  `,
  disabled: css`
    color: ${wf(props => props.theme.disabled)};
  `,
  link: css`
    color: ${wf(props => props.theme.link)};
  `,
  highlighted: css`
    color: ${wf(props => props.theme.highlighted)};
  `,
};

const baseStyle = css`
  font-family: ${primaryFontFamily.join(' ')};
  letter-spacing: 0.08em;
  ${styles.normal}
`;

const textStyles = (...ss: Array<string>) =>
  [baseStyle].concat(ss.map(s => styles[s])).join(' ');

export default textStyles;
