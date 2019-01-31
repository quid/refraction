/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Dropdown from './index';
import DropdownList, { List } from './List';
import { Item, HIGHLIGHTED, SELECTED } from './Items';
import { Divider } from './Categories';
import {
  filterItems,
  includesId,
  filterByCategoryId,
  isItemInCategorySelected,
  splitStringByValue,
} from './utils';

jest.mock('react-popper', () => ({
  Manager: 'x-manager',
  Reference: ({ children }) => children({}),
  Popper: ({ children }) => children({}),
}));

class Input extends React.Component<any> {
  render() {
    return <input {...this.props} />;
  }
}

const items = [
  { id: 10, categoryId: 'a', label: 'One' },
  { id: 22, categoryId: 'a', label: 'Two' },
  { id: 33, categoryId: 'b', label: 'Three' },
  { id: 44, categoryId: 'b', label: 'Four' },
  { id: 55, categoryId: 'b', label: 'Five' },
  { id: 66, categoryId: 'b', label: 'Six', disabled: true },
  { id: 77, categoryId: 'b', label: 'Seven', disabled: true },
  { id: 88, categoryId: 'b', label: 'Eight' },
  { id: 99, categoryId: 'b', label: 'Nine' },
  { id: 101, categoryId: 'b', label: 'Ten' },
  { id: 111, categoryId: 'b', label: 'Eleven' },
  { id: 121, categoryId: 'b', label: 'Twelve' },
  { id: 131, categoryId: 'c', label: 'Thirteen' },
];

const categories = [
  { id: 'a', label: 'Category A' },
  { id: 'b', label: 'Category B' },
  { id: 'c', label: 'Category C' },
];

it('renders items without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Dropdown items={items.slice(0, 2)} initialIsOpen={true}>
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>,
    div
  );
});

it('renders a basic closed dropdown', () => {
  const wrapper = mount(
    <Dropdown items={items.slice(0, 2)}>
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders an open dropdown', () => {
  const wrapper = mount(
    <Dropdown items={items.slice(0, 2)} initialIsOpen={true}>
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders an open dropdown with categories', () => {
  const wrapper = mount(
    <Dropdown
      items={items.slice(0, 4)}
      categories={categories.slice(0, 2)}
      initialIsOpen={true}
      twoColumn={false}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper.find('DropdownContainer')).toMatchSnapshot();
});

it('renders an open dropdown with categories and twoColumn', () => {
  const wrapper = mount(
    <Dropdown
      items={items.slice(0, 4)}
      categories={categories.slice(0, 2)}
      initialIsOpen={true}
      twoColumn={true}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper).toMatchSnapshot();
});

it('onChanges gets called when selecting second value', () => {
  const handleChange = jest.fn();
  const wrapper = mount(
    <Dropdown
      items={items}
      categories={categories}
      initialIsOpen={true}
      twoColumn={true}
      onChange={handleChange}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(1)
    .simulate('click');

  expect(handleChange).toHaveBeenCalledWith(
    [{ id: 22, label: 'Two' }],
    expect.any(Object)
  );
});

it('onChanges gets called when selecting first value', () => {
  const handleChange = jest.fn();

  const wrapper = mount(
    <Dropdown
      items={items}
      categories={categories}
      initialIsOpen={true}
      twoColumn={true}
      onChange={handleChange}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  //Click on the first element
  wrapper
    .find('section ul li')
    .at(0)
    .simulate('click');

  //Click on the input element
  wrapper.find(Input).simulate('click');

  //Click on the second element
  wrapper
    .find('section ul li')
    .at(1)
    .simulate('click');

  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange).toHaveBeenCalledWith(
    [{ id: 10, label: 'One' }],
    expect.any(Object)
  );
  expect(handleChange).toHaveBeenCalledWith(
    [{ id: 22, label: 'Two' }],
    expect.any(Object)
  );
});

it('multiselect should be visible in the onChange callback', () => {
  const handleChange = jest.fn();

  const wrapper = mount(
    <Dropdown
      items={items}
      initialIsOpen={true}
      multiselect={true}
      onChange={handleChange}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  //Clicks on the first element
  wrapper
    .find('ul li')
    .at(0)
    .simulate('click');

  wrapper
    .find('ul li')
    .at(1)
    .simulate('click');

  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange).toHaveBeenCalledWith(
    [{ id: 10, label: 'One' }, { id: 22, label: 'Two' }],
    expect.any(Object)
  );
});

describe('test utils', () => {
  it('[filterItems] should filter items based on a string', () => {
    expect(filterItems(items, 'Thirteen')).toEqual([
      { id: 131, categoryId: 'c', label: 'Thirteen' },
    ]);

    expect(filterItems(items, 'Thir')).toEqual([
      { id: 131, categoryId: 'c', label: 'Thirteen' },
    ]);

    expect(filterItems(items, 'One')).toEqual([
      { id: 10, categoryId: 'a', label: 'One' },
    ]);

    expect(filterItems(items, '')).toMatchSnapshot();
  });

  it('[includesId] should return true if id was found', () => {
    expect(includesId(items, 101)).toBe(true);

    expect(includesId(items, 111)).toBe(true);

    expect(includesId(items, 50)).toBe(false);
  });

  it('[filterByCategoryId] should return items that match the category', () => {
    expect(filterByCategoryId(items, 'a')).toEqual([
      { id: 10, categoryId: 'a', label: 'One' },
      { id: 22, categoryId: 'a', label: 'Two' },
    ]);

    expect(filterByCategoryId(items, 'x')).toEqual([]);
  });

  it('[isItemInCategorySelected] should return true if any of selected items was found in the items', () => {
    const selectedItems = [
      { id: 101, label: 'Ten' },
      { id: 111, label: 'Eleven' },
    ];
    expect(isItemInCategorySelected(selectedItems, items)).toBe(true);
    expect(
      isItemInCategorySelected(selectedItems, [
        { id: 998, label: 'Ten' },
        { id: 999, label: 'Eleven' },
      ])
    ).toBe(false);
  });

  it('[splitStringByValue] should return chunks containing pieces of stirng', () => {
    expect(splitStringByValue('Hello world', 'world')).toEqual([
      { value: 'Hello ', highlight: false },
      { value: 'world', highlight: true },
    ]);

    expect(splitStringByValue('Hello world', 'wo')).toEqual([
      { value: 'Hello world', highlight: false },
    ]);

    expect(splitStringByValue('Hello world', 'wo', 2)).toEqual([
      { value: 'Hello ', highlight: false },
      { value: 'wo', highlight: true },
      { value: 'rld', highlight: false },
    ]);

    expect(splitStringByValue('Hello world', 'w', 1)).toEqual([
      { value: 'Hello ', highlight: false },
      { value: 'w', highlight: true },
      { value: 'orld', highlight: false },
    ]);

    expect(splitStringByValue('Hello world worldie', 'world', 1)).toEqual([
      { value: 'Hello ', highlight: false },
      { value: 'world', highlight: true },
      { value: ' ', highlight: false },
      { value: 'world', highlight: true },
      { value: 'ie', highlight: false },
    ]);

    expect(splitStringByValue('Hello world worldie', 'world', 6)).toEqual([
      { value: 'Hello world worldie', highlight: false },
    ]);
  });
});

it('using arrow down and return key should select another element', () => {
  const handleSelect = jest.fn();
  const wrapper = mount(
    <Dropdown
      items={items}
      initialIsOpen={true}
      onSelect={handleSelect}
      multiselect={true}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  wrapper.find(Input).simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
  wrapper.find(Input).simulate('keyDown', { key: 'Enter', keyCode: 13 });

  expect(handleSelect).toHaveBeenCalledWith(
    { id: 10, label: 'One' },
    expect.any(Object)
  );
});

it('using useFilter should only return items that match the input value', () => {
  const wrapper = mount(
    <Dropdown
      items={items}
      initialIsOpen={true}
      useFilter={true}
      highlight={true}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper.find(Input).simulate('change', { target: { value: 'F' } });

  expect(wrapper.find('ul li')).toHaveLength(2);
  expect(wrapper).toMatchSnapshot();
});

it('DropDown list should return null when filtering returns 0 items', () => {
  const wrapper = mount(
    <Dropdown items={items} initialIsOpen={true} useFilter={true}>
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper.find(Input).simulate('change', { target: { value: 'Fooour' } });

  expect(wrapper.find('ul li')).toHaveLength(0);
  expect(wrapper.find(DropdownList).prop('children')).toBe(undefined);
});

it('Two clicks on the same item should call onChange twice, at the end nothing should be selected', () => {
  const handleChange = jest.fn();
  const wrapper = mount(
    <Dropdown
      items={items}
      initialIsOpen={true}
      onChange={handleChange}
      multiselect={true}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(0)
    .simulate('click');

  wrapper
    .find('ul li')
    .at(0)
    .simulate('click');

  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange).toHaveBeenCalledWith(
    [{ id: 10, label: 'One' }],
    expect.any(Object)
  );
  expect(handleChange).toHaveBeenCalledWith([], expect.any(Object));
});

it('hovering on an item makes it highlighted', () => {
  const wrapper = mount(
    <Dropdown items={items} initialIsOpen={true} categories={categories}>
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(0)
    .simulate('mousemove');

  expect(
    wrapper
      .find(Item)
      .at(0)
      .prop('isHighlighted')
  ).toBe(true);
});

it('Should not fail when a certaing category doesnt have any item.', () => {
  const extraCategory = [...categories, { id: 'x', label: 'Category X' }];
  expect(() =>
    mount(
      <Dropdown items={items} initialIsOpen={true} categories={extraCategory}>
        {({ getInputProps }) => <Input {...getInputProps()} />}
      </Dropdown>
    )
  ).not.toThrowError();
});

it('Empty item label should not break anything.', () => {
  const handleSelect = jest.fn();
  const wrapper = mount(
    <Dropdown
      items={[{ id: 10, label: '' }]}
      multiselect={true}
      initialIsOpen={true}
      onSelect={handleSelect}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(0)
    .simulate('click');

  expect(handleSelect).toHaveBeenCalledWith(
    { id: 10, label: '' },
    expect.any(Object)
  );
});

it('initial selected item should set the input value', () => {
  const selectedItems = [{ id: 22, label: 'Two' }];
  const wrapper = mount(
    <Dropdown
      items={items}
      categories={categories}
      initialIsOpen={true}
      selectedItems={selectedItems}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  expect(wrapper.find(Input).props().value).toEqual(selectedItems[0].label);
});

it('using arrow down should hover on element', () => {
  const selectedItems = [{ id: 22, label: 'Two' }];
  const wrapper = mount(
    <Dropdown
      items={items}
      categories={categories.reverse()}
      twoColumn={false}
      initialIsOpen={true}
      selectedItems={selectedItems}
      multiselect={true}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper.find(Input).simulate('keyDown', {
    key: 'ArrowDown',
    keyCode: 40,
  });

  expect(
    wrapper
      .find('ul')
      .hostNodes()
      .at(2)
  ).toMatchSnapshot();
});

it('supports dark theme', () => {
  expect(
    mount(
      <Divider
        isHighlighted
        twoColumn
        theme={{ current: 'dark', colors: { gray5: 'gray5' } }}
      />
    )
  ).toHaveStyleRule('background-color', 'gray5');

  expect(
    HIGHLIGHTED({
      theme: { current: 'dark', colors: { gray5: 'gray5' } },
    })
  ).toBe('gray5');

  expect(
    SELECTED({
      theme: { current: 'dark', colors: { gray1: 'gray1' } },
    })
  ).toBe('gray1');

  expect(
    mount(
      <Item
        isSelected
        theme={{
          current: 'dark',
          colors: {},
          primaryInverse: 'primaryInverse',
        }}
      />
    )
  ).toHaveStyleRule('color', 'primaryInverse');

  expect(
    mount(
      <List
        isSelected
        theme={{
          current: 'dark',
          colors: { gray6: 'gray6' },
        }}
      />
    )
  ).toHaveStyleRule('background-color', 'gray6');
});
