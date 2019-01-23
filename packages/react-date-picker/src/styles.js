// @flow
import styled from '@emotion/styled/macro';
import { textStyles, colors, withFallback as wf } from '@quid/theme';

export const CELL_HEIGHT = 30;
export const CELL_WIDTH = 30;

export const Container = styled.div`
  width: 330px;
  height: 422px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;

export const Navigator = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${wf(props => props.theme.primary)};
`;

export const Year = styled.span`
  ${textStyles('large')}
  margin-left: auto;
  margin-right: auto;
`;

export const Th = styled.th`
  font-weight: normal;
`;

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${colors.black};
  background-color: ${wf(props =>
    props.theme.current === 'light'
      ? props.theme.colors.white
      : props.theme.colors.gray6
  )};
  border: 1px solid ${wf(props => props.theme.colors.gray3)};
  border-top: 0px;
  border-radius: 0 0 2px 2px;
  padding: 0 6px 20px 6px;
`;

export const Table = styled.table`
  text-align: center;
`;

export const Days = styled.tbody`
  &::before {
    content: '';
    display: block;
    height: 3px;
  }
`;
