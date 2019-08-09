/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { Icon } from '@quid/react-core';
import { ThemeProvider, themes } from '@quid/theme';
import { Tooltip } from '@quid/react-tooltip';
import useControlledState from '@quid/react-use-controlled-state';
import {
  ColumnCell,
  Row,
  ExpandableContent,
  List,
  Header,
  AngleButton,
  HeaderTitle,
  Ellipsis,
  InfoIcon,
  SortIcon,
  TooltipContainer,
} from './styles';
import type { Data, ID, SortOrder } from './types';
import {
  getSortedData,
  onKeyboardSelect,
  filterDataForPagination,
} from './utils';

type Column = {
  label: string,
  key: string,
  align?: 'left' | 'right' | 'center',
  width?: number,
  tooltip?: React.Node,
  bold?: boolean,
};

type RenderRow = ({
  isOdd: boolean,
  isLast: boolean,
  data: Data,
}) => React.Node;

type Props = {
  /** Set this if you'd like the table to handle the expanded/collapsed state internally */
  defaultOpenedRows?: Array<ID>,
  /** Set this if you'd like to manually handle the expanded/collapsed state */
  openedRows?: Array<ID>,
  /** You will need to manually handle the openedRows list using the list returned by this callback */
  onToggle?: (Array<ID>) => void,
  /**  By default only one row at a time can be expanded */
  maxOpen?: number,
  /** Define the columns structure, it will be used to order the data */
  columns: Array<Column>,
  /** The data to display in the table, refer to the `Data` type or the example for more information */
  data: Array<Data>,
  /**
   * @deprecated Maximum list height, please prefer a custom `className` or `style` value instead
   */
  maxBodyHeight?: number,
  /** Set this to a number higher than 0 to enable pagination */
  page?: number,
  /** When pagination is enabled, this is the maximum number of items visible on each page */
  maxItemPerPage?: number,
  /** Sorting order, you can invert this to have a different behavior */
  defaultSortOrder?: SortOrder,
  /*
   * Render-prop used to define what to render when a row is expanded.
   * It provides isOdd (boolean), isLast (boolean), and a `data` property with the interested row.
   */
  renderRow: RenderRow,
};

const ARROW_CELL_WIDTH = 40;
const getCellWidth = width =>
  `calc((100% - ${ARROW_CELL_WIDTH}px) / 100 * ${width})`;

type RowProps = {
  index: number,
  totalCount: number,
  renderRow: RenderRow,
  open: boolean,
  data: Data,
  odd: boolean,
  onClick: () => void,
  columns: Array<Column>,
  baseColumnWidth: number,
};
export const ItemWrapper = styled(
  ({
    index,
    totalCount,
    renderRow,
    open,
    data,
    odd,
    onClick,
    columns,
    baseColumnWidth,
    ...props
  }: RowProps) => (
    <div {...props}>
      <Row
        open={open}
        odd={odd}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyboardSelect(onClick)}
        data-action="expand-row"
      >
        {columns.map(column => (
          <ColumnCell
            width={getCellWidth(column.width || baseColumnWidth)}
            align={column.align}
            key={column.key}
            bold={column.bold}
          >
            <Ellipsis>{data[column.key]}</Ellipsis>
          </ColumnCell>
        ))}
        <ColumnCell width={`${ARROW_CELL_WIDTH}px`} align="right">
          <AngleButton open={open} onClick={onClick}>
            <Icon name="angle_down" />
          </AngleButton>
        </ColumnCell>
      </Row>
      {open && (
        <ExpandableContent>
          {renderRow({
            isOdd: odd,
            isLast: totalCount === index + 1,
            data,
          })}
        </ExpandableContent>
      )}
    </div>
  )
)`
  background-color: ${({ theme, odd }) =>
    odd ? theme.colors.gray7 : theme.colors.gray6};
`;
ItemWrapper.defaultProps = {
  theme: themes.dark,
};

const ExpandableTable = ({
  defaultOpenedRows,
  openedRows: controlledOpenedRows,
  onToggle,
  maxOpen = 1,
  columns,
  data,
  maxBodyHeight,
  page = 0,
  maxItemPerPage = 10,
  defaultSortOrder = ['desc', 'asc'],
  renderRow,
  ...props
}: Props) => {
  const [sorting, setSorting] = React.useState({
    key: null,
    sort: null,
  });
  const changeSorting = React.useCallback(
    key => {
      if (key !== sorting.key || !defaultSortOrder.includes(sorting.sort)) {
        setSorting({ key, sort: defaultSortOrder[0] });
      } else {
        setSorting({
          key,
          sort: defaultSortOrder[defaultSortOrder.indexOf(sorting.sort) + 1],
        });
      }
    },
    [defaultSortOrder, sorting, setSorting]
  );
  const groomedData = React.useMemo(
    () =>
      filterDataForPagination(
        getSortedData(data, sorting.sort, sorting.key),
        page,
        maxItemPerPage
      ),
    [data, sorting, page, maxItemPerPage]
  );
  const totalCount = groomedData.length;

  const [openedRows = [], setOpenedRows] = useControlledState(
    defaultOpenedRows,
    controlledOpenedRows,
    onToggle
  );
  const toggleRow = React.useCallback(
    id =>
      setOpenedRows(
        (openedRows.includes(id)
          ? openedRows.filter(currentId => currentId !== id)
          : openedRows.concat(id)
        ).slice(-maxOpen)
      ),
    [openedRows, setOpenedRows, maxOpen]
  );

  const baseColumnWidth = React.useMemo(() => {
    return (
      columns.reduce((acc, val) => (val.width ? acc - val.width : acc), 100) /
      columns.filter(val => val.width == null).length
    );
  }, [columns]);

  return (
    <ThemeProvider theme="dark">
      <List
        {...props}
        groupCounts={[totalCount]}
        maxHeight={maxBodyHeight}
        group={index => (
          <Header>
            {columns.map(column => (
              <ColumnCell
                width={getCellWidth(column.width || baseColumnWidth)}
                key={column.key}
                align={column.align}
              >
                <HeaderTitle
                  onClick={() => changeSorting(column.key)}
                  inactive={sorting.sort && sorting.key !== column.key}
                  data-action="sort-alt"
                >
                  {column.label}
                </HeaderTitle>

                <SortIcon
                  sort={sorting.key === column.key ? sorting.sort : null}
                  onClick={() => changeSorting(column.key)}
                  data-action="sort"
                />

                {column.tooltip != null && (
                  <Tooltip
                    openDelay={200}
                    renderTooltip={props => (
                      <TooltipContainer {...props} children={column.tooltip} />
                    )}
                  >
                    {({ ref, open, close }) => (
                      <InfoIcon
                        ref={ref}
                        onMouseEnter={open}
                        onFocus={open}
                        onBlur={close}
                      />
                    )}
                  </Tooltip>
                )}
              </ColumnCell>
            ))}
            <ColumnCell width={`${ARROW_CELL_WIDTH}px`} />
          </Header>
        )}
        item={index => (
          <ItemWrapper
            data={groomedData[index]}
            columns={columns}
            index={index}
            totalCount={totalCount}
            onClick={() => toggleRow(groomedData[index].id)}
            renderRow={renderRow}
            open={openedRows.includes(groomedData[index].id)}
            odd={Boolean(index % 2)}
            baseColumnWidth={baseColumnWidth}
          />
        )}
      />
    </ThemeProvider>
  );
};

export * from './styles';
export { ExpandableTable };
