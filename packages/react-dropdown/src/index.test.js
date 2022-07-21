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
import styled from '@emotion/styled/macro';
import DropdownWrapper from './__mocks__/DropdownWrapper';
import { Dropdown, DropdownList as DL } from './index';
import DropdownList, { List } from './List';
import { Item, HIGHLIGHTED, SELECTED } from './Items';
import {
  Divider,
  createCategoryIndex,
  isCategoryHighlighted,
  isCategoryItemHighlighted,
} from './Categories';
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
    <Dropdown items={items.slice(0, 2)} defaultIsOpen={true}>
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>,
    div
  );
});

it('renders a basic closed dropdown', () => {
  const wrapper = mount(
    <Dropdown items={items.slice(0, 2)}>
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders an open dropdown', () => {
  const wrapper = mount(
    <Dropdown items={items.slice(0, 2)} defaultIsOpen={true}>
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders an open dropdown with categories', () => {
  const wrapper = mount(
    <Dropdown
      items={items.slice(0, 4)}
      categories={categories.slice(0, 2)}
      defaultIsOpen={true}
      twoColumn={false}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper.find('DropdownContainer')).toMatchSnapshot();
});

it('renders an open dropdown with categories and twoColumn', () => {
  const wrapper = mount(
    <Dropdown
      items={items.slice(0, 4)}
      categories={categories.slice(0, 2)}
      defaultIsOpen={true}
      twoColumn={true}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
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
      defaultIsOpen={true}
      twoColumn={true}
      onChange={handleChange}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(1)
    .simulate('click');

  expect(handleChange).toHaveBeenCalledWith(
    [{ categoryId: 'a', id: 22, label: 'Two' }],
    expect.any(Object)
  );
});

it('onChanges gets called when selecting first value', () => {
  const handleChange = jest.fn();

  const wrapper = mount(
    <Dropdown
      items={items}
      categories={categories}
      defaultIsOpen={true}
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
    [{ categoryId: 'a', id: 10, label: 'One' }],
    expect.any(Object)
  );
  expect(handleChange).toHaveBeenCalledWith(
    [{ categoryId: 'a', id: 22, label: 'Two' }],
    expect.any(Object)
  );
});

it('multiselect should be visible in the onChange callback', () => {
  const handleChange = jest.fn();

  const wrapper = mount(
    <Dropdown
      items={items}
      defaultIsOpen={true}
      multiselect={true}
      onChange={handleChange}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
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
    [
      { categoryId: 'a', id: 10, label: 'One' },
      { categoryId: 'a', id: 22, label: 'Two' },
    ],
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
      defaultIsOpen={true}
      onSelect={handleSelect}
      multiselect={true}
    >
      {({ getInputProps }) => <Input {...getInputProps()} />}
    </Dropdown>
  );
  wrapper.find(Input).simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
  wrapper.find(Input).simulate('keyDown', { key: 'Enter', keyCode: 13 });

  expect(handleSelect).toHaveBeenCalledWith(
    [{ categoryId: 'a', id: 10, label: 'One' }],
    expect.any(Object)
  );
});

it('using useFilter should only return items that match the input value', () => {
  const wrapper = mount(
    <Dropdown
      items={items}
      defaultIsOpen={true}
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
    <Dropdown items={items} defaultIsOpen={true} useFilter={true}>
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
      defaultIsOpen={true}
      onChange={handleChange}
      multiselect={true}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
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
    [{ categoryId: 'a', id: 10, label: 'One' }],
    expect.any(Object)
  );
  expect(handleChange).toHaveBeenCalledWith([], expect.any(Object));
});

it('hovering on an item makes it highlighted', () => {
  const wrapper = mount(
    <Dropdown items={items} defaultIsOpen={true} categories={categories}>
      {({ getInputProps }) => <input {...getInputProps()} />}
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
      <Dropdown items={items} defaultIsOpen={true} categories={extraCategory}>
        {({ getInputProps }) => <input {...getInputProps()} />}
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
      defaultIsOpen={true}
      onSelect={handleSelect}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(0)
    .simulate('click');

  expect(handleSelect).toHaveBeenCalledWith(
    [{ id: 10, label: '' }],
    expect.any(Object)
  );
});

it('initial selected item should set the input value', () => {
  const selectedItems = [{ id: 22, label: 'Two' }];
  const wrapper = mount(
    <Dropdown
      items={items}
      categories={categories}
      defaultIsOpen={true}
      selectedItems={selectedItems}
      onChange={() => {}}
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
      defaultIsOpen={true}
      selectedItems={selectedItems}
      onChange={() => {}}
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
      theme: { current: 'dark', colors: { gray3: 'gray3' } },
    })
  ).toBe('gray3');

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

it('Children provided trough itemds should be present', () => {
  const wrapper = mount(
    <Dropdown
      items={[
        {
          id: 131,
          categoryId: 'c',
          label: 'Thirteen',
          children: ({ isHighlighted, isSelected, isDisabled, item }) => (
            <div data-child="hw" data-itemid={item.id}>
              Hello world.
            </div>
          ),
        },
      ]}
      defaultIsOpen={true}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );
  const children = wrapper.find('div[data-child="hw"]');
  expect(children.prop('data-itemid')).toBe(131);
  expect(children.length).toBe(1);
});

it('should clear the previously selected items', () => {
  const wrapper = mount(
    <Dropdown items={[{ id: 10, label: 'Hello world' }]} defaultIsOpen={true}>
      {({ getInputProps, clearSelection }) => (
        <div>
          <input {...getInputProps()} />
          <button onClick={clearSelection}>Reset</button>
        </div>
      )}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .at(0)
    .simulate('click');

  expect(
    wrapper
      .find('input')
      .at(0)
      .props().value
  ).toBe(10);

  wrapper.find('button').simulate('click');

  expect(
    wrapper
      .find('input')
      .at(0)
      .props().value
  ).toBe('');
});

it('onChange should be called with the newly selected items', () => {
  const onChangeFn = jest.fn();

  const wrapper = mount(
    <Dropdown
      items={items}
      defaultIsOpen={true}
      selectedItems={[items[0]]}
      onChange={onChangeFn}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('ul li')
    .hostNodes()
    .at(1)
    .simulate('click');

  expect(onChangeFn).toHaveBeenCalledWith(
    [{ categoryId: 'a', id: 22, label: 'Two' }],
    expect.anything()
  );
});

it('changing value using controlled component should result in the good value', () => {
  const wrapper = mount(
    <DropdownWrapper initialSelectedItems={[items[1]]} items={items} />
  );
  wrapper
    .find('ul li')
    .hostNodes()
    .at(1)
    .simulate('click');

  expect(
    wrapper
      .find('input')
      .at(0)
      .props().value
  ).toBe(22);

  expect(
    wrapper
      .find('input')
      .at(1)
      .props().value
  ).toBe('Two');
});

it('changing value and not updating it on change on controlled component should not override the input values', () => {
  const wrapper = mount(
    <DropdownWrapper
      initialSelectedItems={[items[2]]}
      items={items}
      skipUpdate={true}
    />
  );
  wrapper
    .find('ul li')
    .hostNodes()
    .at(5)
    .simulate('click');

  expect(
    wrapper
      .find('input')
      .at(0)
      .props().value
  ).toBe(33);

  expect(
    wrapper
      .find('input')
      .at(1)
      .props().value
  ).toBe('Three');
});

it('console error called when both defaultSelectedItems and selectedItems are provided', () => {
  // $FlowIgnoreMe(fzivolo): we don't want to pollute the Jest output
  console.error = jest.fn();
  const spy = jest.spyOn(console, 'error');

  mount(
    <Dropdown
      items={items}
      defaultSelectedItems={[items[0]]}
      selectedItems={[items[0]]}
      onChange={() => {}}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  mount(
    <Dropdown
      items={items}
      defaultSelectedItems={[items[0]]}
      selectedItems={[items[0]]}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  expect(spy).toHaveBeenCalledWith(
    'Warning: App contains an input of type undefined with both `selectedItems` and `defaultSelectedItems` props. Dropdown elements must be either controlled or uncontrolled (specify either the selectedItems prop, or the defaultSelectedItems prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props.'
  );

  expect(spy).toHaveBeenCalledWith(
    'Warning: Failed prop type: You provided a `selectedItems` prop to a form field without an `onChange` handler. If the field should be mutable use `defaultSelectedItems`. Otherwise, set `onChange`.'
  );
});

it('tests functionality of defaultSelectedItems are properly set', () => {
  const wrapper = mount(
    <Dropdown
      items={items}
      defaultSelectedItems={[items[5]]}
      defaultIsOpen={true}
      onChange={() => {}}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  expect(
    wrapper
      .find('input')
      .at(0)
      .props().value
  ).toBe(66);

  expect(
    wrapper
      .find('input')
      .at(1)
      .props().value
  ).toBe('Six');
});

it('empty selected items should result in empty string input value ', () => {
  const wrapper = mount(
    <DropdownWrapper
      initialSelectedItems={[]}
      items={[{ id: 11, label: 'asd' }]}
    />
  );

  wrapper
    .find('ul li')
    .hostNodes()
    .at(0)
    .simulate('click');

  expect(
    wrapper
      .find('input')
      .at(0)
      .props().value
  ).toBe(11);
});

it('custom renderDropdown function should render', () => {
  const wrapper = mount(
    <DropdownWrapper
      initialSelectedItems={[]}
      items={[{ id: 11, label: 'asd' }]}
      defaultIsOpen={true}
      renderDropdown={({ dropdown }) => <div id="foobar">{dropdown}</div>}
    />
  );

  expect(wrapper.find('#foobar')).toHaveLength(1);

  expect(wrapper.find('ul li').hostNodes().length > 0).toBe(true);
});

it('custom dropdown list should be rendered', () => {
  const customizeDropdownList = () => <div id="customizeList"></div>;
  const wrapper = mount(
    <Dropdown
      items={items.slice(0, 2)}
      defaultIsOpen={true}
      customizeDropdownList={customizeDropdownList}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );
  expect(wrapper.find('#customizeList')).toHaveLength(1);
});

it('DropdownList could be styled', () => {
  const StyledDropdown = styled(Dropdown)`
    ${DL} {
      width: 100px;
    }
  `;

  const wrapper = mount(
    <StyledDropdown items={items.slice(0, 2)} defaultIsOpen={true}>
      {({ getInputProps }) => <input {...getInputProps()} />}
    </StyledDropdown>
  );
  expect(wrapper).toHaveStyleRule('width', '100px', { target: DL });
});

it('createCategoryIndex fn should create a string', () => {
  expect(createCategoryIndex('12')).toBe('group_12');
});

it('isCategoryHighlighted fn should return boolean based on params', () => {
  expect(isCategoryHighlighted(false, null, null)).toBe(false);
  expect(isCategoryHighlighted(true, 'group_12', 12)).toBe(true);
  expect(isCategoryHighlighted(true, 'group_12', 13)).toBe(false);
});

it('isCategoryItemHighlighted fn should return boolean based on params', () => {
  expect(isCategoryItemHighlighted(10, 1, 10)).toBe(true);
  expect(isCategoryItemHighlighted(null, 1, 10)).toBe(false);
  expect(isCategoryItemHighlighted(50, 1, 10)).toBe(false);
  expect(isCategoryItemHighlighted(undefined, 1, 10)).toBe(false);
});

it('multiselect should allow group selection', () => {
  const handleSelect = jest.fn();
  const handleChange = jest.fn();
  const wrapper = mount(
    <Dropdown
      items={items.slice(0, 4)}
      categories={categories.slice(0, 2)}
      defaultIsOpen={true}
      twoColumn={true}
      multiselect={true}
      onSelect={handleSelect}
      onChange={handleChange}
    >
      {({ getInputProps }) => <input {...getInputProps()} />}
    </Dropdown>
  );

  wrapper
    .find('CategorySelection')
    .filterWhere(e => {
      return e.props().categoryId === 'b';
    })
    .find('div')
    .simulate('click');

  expect(handleSelect).toHaveBeenCalledWith(
    [
      { categoryId: 'b', id: 33, index: 0, label: 'Three' },
      { categoryId: 'b', id: 44, index: 1, label: 'Four' },
    ],
    expect.any(Object)
  );

  expect(handleChange).toHaveBeenCalledWith(
    [
      { categoryId: 'b', id: 33, index: 0, label: 'Three' },
      { categoryId: 'b', id: 44, index: 1, label: 'Four' },
    ],
    expect.any(Object)
  );
});
