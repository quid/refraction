// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { textStyles, withFallback as wf } from '@quid/theme';

type Props = {
  year: ?number,
  month: ?number,
  day: ?number,
  className?: ?string,
};

const localeOptions = {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
};

const empty = <span>&nbsp;</span>;

const Year = styled.div`
  opacity: 0.7;
  ${textStyles('large', 'bold')};
  color: ${wf(props => props.theme.colors.white)};
`;

const Rest = styled.div`
  ${textStyles('xlarge', 'bold')};
  color: ${wf(props => props.theme.colors.white)};
`;

const Header = styled(({ className, year, month, day }: Props) => {
  const date =
    typeof year === 'number' &&
    typeof month === 'number' &&
    typeof day === 'number' &&
    new Date(year, month, day);

  return (
    <div className={className}>
      <Year>{year ? year : empty}</Year>
      <Rest>
        {date && !isNaN(date)
          ? date.toLocaleDateString('en-us', localeOptions)
          : 'Invalid Date'}
      </Rest>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  height: 94px;
  align-items: flex-start;
  padding: 20px;
  border-radius: 2px 2px 0 0;
  background-color: ${wf(props =>
    props.theme.current === 'light'
      ? props.theme.colors.gray2
      : props.theme.colors.gray5
  )};
  border-width: 1px 1px 0 1px;
  border-style: solid;
  border-color: ${wf(props => props.theme.colors.gray3)};
`;

export default Header;
