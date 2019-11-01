/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '@quid/theme';
import { ExpandableTable } from '.';
// $FlowIgnoreMe: this is a mocked export
import { open } from '@quid/react-tooltip';

jest.mock('react-virtuoso', () => ({
  GroupedVirtuoso: ({ groupCounts, group, item, ...props }) => (
    <div {...props}>
      {group(0)}

      {groupCounts
        .map(length =>
          Array.from({ length }).map((_, index) => (
            <div key={index}>{item(index)}</div>
          ))
        )
        .flatMap(a => a)}
    </div>
  ),
}));

const ExampleExtendedComponent = ({ isOdd, isLast, data, ...props }) => (
  <div {...props} />
);

const columns = [
  {
    label: 'Name',
    key: 'name',
    align: 'left',
  },
  {
    label: 'Rank',
    key: 'rank',
    align: 'right',
    bold: true,
  },
  {
    label: 'Mentions',
    key: 'mentions',
    align: 'center',
  },
  {
    label: 'KOL Score',
    key: 'kol_score',
  },
  {
    label: 'Reach',
    key: 'reach',
    width: 10,
  },
];

const data = [
  {
    id: '1',
    name: 'Iron Man',
    rank: '1',
    mentions: '9',
    kol_score: '93.70%',
    reach: '93.60%',
  },
  {
    id: '2',
    name: 'Captain America',
    rank: '2',
    mentions: '38',
    kol_score: '99.70%',
    reach: '99.45%',
  },
];

it('should make column bold', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={1}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  expect(
    wrapper
      .find('Row')
      .at(0)
      .find('ColumnCell')
      .at(1)
  ).toHaveStyleRule('font-weight', 'bold');
});

it('should render dark theme without raising errors', () => {
  expect(() =>
    mount(
      <ThemeProvider theme="dark">
        <ExpandableTable
          maxOpen={1}
          maxBodyHeight={300}
          renderRow={props => <ExampleExtendedComponent {...props} />}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    )
  ).not.toThrowError();
});

it('should keep only one item open when maxOpen is 1', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={1}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(0)
    .simulate('click');
  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(1)
    .simulate('click');

  expect(wrapper.find(ExampleExtendedComponent)).toHaveLength(1);
});

it('should expand row with keyboard', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={1}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(0)
    .simulate('keydown', { which: 13 });

  expect(wrapper.find(ExampleExtendedComponent)).toHaveLength(1);
});

it('should default to auto max-height', () => {
  const wrapper = mount(
    <ExpandableTable
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  expect(wrapper.find('List')).toHaveStyleRule('max-height', 'auto');
});

it('should keep two items open if maxOpen is 2', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(0)
    .simulate('click');
  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(1)
    .simulate('click');

  expect(wrapper.find(ExampleExtendedComponent)).toHaveLength(2);
});

it('clicking on the same item should close the row', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={100}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(0)
    .simulate('click');
  wrapper
    .find('[data-action="expand-row"]')
    .hostNodes()
    .at(0)
    .simulate('click');

  expect(wrapper.find(ExampleExtendedComponent)).toHaveLength(0);
});

it('should render a single row', () => {
  const singleRow = [
    {
      id: '8',
      name: 'Mark Carney',
      rank: '8',
      mentions: '21',
      kol_score: '0.00%',
      reach: '0.00%',
    },
  ];
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={singleRow}
    />
  );
  expect(wrapper.find('Row')).toHaveLength(1);
});

it('openedRows should open rows on first render', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={1}
      openedRows={['1', '2']}
      onToggle={jest.fn()}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );

  expect(wrapper.find(ExampleExtendedComponent)).toHaveLength(2);
});

it('only one element should be visible on the first page', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={1}
      page={1}
      maxItemPerPage={1}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={data}
    />
  );
  expect(wrapper.find('[data-action="expand-row"]').hostNodes().length).toBe(1);
  expect(wrapper.find('Row')).toHaveLength(1);
});

it('clicking on name in the header should sort data according to names in descending order', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={[
        ...data,
        {
          id: '5',
          name: 'Jamie Dimon',
          rank: '5',
          mentions: '35',
          kol_score: '99.10%',
          reach: '99.10%',
          score: 250,
        },
        {
          id: '6',
          name: 'Agustín Carstens',
          rank: '6',
          mentions: '34',
          kol_score: '0.00%',
          reach: '0.00%',
          score: 300,
        },
      ]}
    />
  );

  wrapper
    .find('[data-action="sort"]')
    .hostNodes()
    .at(0)
    .simulate('click');
  expect(wrapper.find('Row').map(node => node.text())).toMatchInlineSnapshot(`
Array [
  "Jamie Dimon53599.10%99.10%angle_down",
  "Iron Man1993.70%93.60%angle_down",
  "Captain America23899.70%99.45%angle_down",
  "Agustín Carstens6340.00%0.00%angle_down",
]
`);
});

it('clicking on name twice in the header should sort data according to names in ascending order', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={[
        ...data,
        {
          id: '5',
          name: 'Jamie Dimon',
          rank: '5',
          mentions: '35',
          kol_score: '99.10%',
          reach: '99.10%',
          score: 250,
        },
        {
          id: '6',
          name: 'Agustín Carstens',
          rank: '6',
          mentions: '34',
          kol_score: '0.00%',
          reach: '0.00%',
          score: 300,
        },
        {
          id: '7',
          name: 'Agustín Carstens',
          rank: '7',
          mentions: '35',
          kol_score: '0.00%',
          reach: '0.00%',
          score: 300,
        },
      ]}
    />
  );

  wrapper
    .find('[data-action="sort"]')
    .hostNodes()
    .at(0)
    .simulate('click');
  wrapper
    .find('[data-action="sort-alt"]')
    .hostNodes()
    .at(0)
    .simulate('click');
  expect(wrapper.find('Row').map(node => node.text())).toMatchInlineSnapshot(`
Array [
  "Agustín Carstens6340.00%0.00%angle_down",
  "Agustín Carstens7350.00%0.00%angle_down",
  "Captain America23899.70%99.45%angle_down",
  "Iron Man1993.70%93.60%angle_down",
  "Jamie Dimon53599.10%99.10%angle_down",
]
`);
});

it('clicking on name three times in the header should not sort the data', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={[
        ...data,
        {
          id: '5',
          name: 'Jamie Dimon',
          rank: '5',
          mentions: '35',
          kol_score: '99.10%',
          reach: '99.10%',
          score: 250,
        },
        {
          id: '6',
          name: 'Agustín Carstens',
          rank: '6',
          mentions: '34',
          kol_score: '0.00%',
          reach: '0.00%',
          score: 300,
        },
      ]}
    />
  );

  const nameBtn = wrapper
    .find('[data-action="sort"]')
    .hostNodes()
    .at(1);

  nameBtn.simulate('click');
  nameBtn.simulate('click');
  nameBtn.simulate('click');

  expect(wrapper.find('Row').map(node => node.text())).toMatchInlineSnapshot(`
Array [
  "Iron Man1993.70%93.60%angle_down",
  "Captain America23899.70%99.45%angle_down",
  "Jamie Dimon53599.10%99.10%angle_down",
  "Agustín Carstens6340.00%0.00%angle_down",
]
`);
});

it('empty data set should not be sorted', () => {
  const wrapper = mount(
    <ExpandableTable
      maxOpen={2}
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columns}
      data={[]}
    />
  );
  wrapper.update();
  const nameBtn = wrapper
    .find('[data-action="sort"]')
    .hostNodes()
    .at(1);

  nameBtn.simulate('click');
  expect(wrapper.find('Row').map(node => node.text())).toMatchInlineSnapshot(
    `Array []`
  );
});

jest.mock('@quid/react-tooltip', () => {
  const open = jest.fn();
  return {
    open,
    Container: 'x-container',
    Tooltip: ({ children, renderTooltip }) => {
      const [isOpen, setOpen] = require('react').useState(false);
      return (
        <x-tooltip>
          {children({
            open: () => {
              setOpen(true);
              open();
            },
          })}
          {isOpen && renderTooltip()}
        </x-tooltip>
      );
    },
  };
});

it('checks for tooltip presence', () => {
  const columnsWithTooltip = [
    {
      label: 'Tooltip',
      key: 'tooltip',
      tooltip: 'Hello world',
    },
  ];

  const wrapper = mount(
    <ExpandableTable
      maxBodyHeight={300}
      renderRow={props => <ExampleExtendedComponent {...props} />}
      columns={columnsWithTooltip}
      data={[]}
    />
  );

  const infoIcon = wrapper.find('InfoIcon');
  expect(infoIcon).toHaveLength(1);

  infoIcon.find('button').simulate('mouseenter');
  expect(open).toHaveBeenCalled();
});
