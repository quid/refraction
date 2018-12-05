// @flow
import { css } from '@emotion/core';
import wf from './withFallback';

const primaryFontFamily = css`
  font-family: Asap, Lucida Grande, Tahoma, Verdana, Arial, sans-serif;
`;

const secondaryFontFamily = css`
  font-family: Georgia, Gudea, Lucida Grande, Tahoma, Verdana, Arial, sans-serif;
`;

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
    font-size: 15px;
    line-height: 1.6;
    ${secondaryFontFamily}
  `,
  body: css`
    line-height: 1.54;
    ${secondaryFontFamily}
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
  letter-spacing: 0.08em;
  ${primaryFontFamily}
  ${styles.normal}
`;

const textStyles = (...ss: Array<string>) =>
  css`
    ${baseStyle};
    ${ss.map(s => styles[s])}
  `;

export default textStyles;
