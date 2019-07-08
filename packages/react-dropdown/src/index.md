#### Dropdown with single item list

This is the most basic use case, the dropdown will behave like a
normal HTML `select` element:

```js
import { InputText } from '@quid/react-forms';

const items = [
  { id: 10, label: 'One' },
  { id: 22, label: 'Two' },
  { id: 33, label: 'Three' },
  { id: 44, label: 'Four' },
  { id: 55, label: 'Four' },
  { id: 66, label: 'Three' },
  { id: 77, label: 'Four' },
  { id: 88, label: 'Three' },
  { id: 99, label: 'Four' },
  { id: 101, label: 'Three' },
  { id: 111, label: 'Four' },
  { id: 121, label: 'Three' },
  { id: 131, label: 'One' },
];

<Dropdown items={items} defaultSelectedItems={[items[3]]}>
  {({ getInputProps }) => <InputText readOnly {...getInputProps()} />}
</Dropdown>;
```

This is usecase will allow you to use `Dropdown` as a controlled component.

```js
import { InputText } from '@quid/react-forms';

initialState = {
  selectedItems: [{ id: 10, label: 'One' }],
};

const items = [
  { id: 10, label: 'One' },
  { id: 22, label: 'Two' },
  { id: 33, label: 'Three' },
  { id: 44, label: 'Four' },
  { id: 55, label: 'Four' },
  { id: 66, label: 'Three' },
  { id: 77, label: 'Four' },
  { id: 88, label: 'Three' },
  { id: 99, label: 'Four' },
  { id: 101, label: 'Three' },
  { id: 111, label: 'Four' },
  { id: 121, label: 'Three' },
  { id: 131, label: 'One' },
];

<Dropdown
  items={items}
  selectedItems={[]}
  onChange={newSelectedItems => {
    setState({
      selectedItems: newSelectedItems,
    });
  }}
>
  {({ getInputProps }) => <InputText {...getInputProps()} />}
</Dropdown>;
```

#### Dropdown with multi-level item list (one column)

In this example, the items are grouped by category.

```jsx
import { InputText } from '@quid/react-forms';

const items = [
  { id: 10, categoryId: 'a', label: 'One', disabled: true },
  { id: 22, categoryId: 'a', label: 'Two', disabled: true },
  { id: 33, categoryId: 'b', label: 'Three' },
  { id: 44, categoryId: 'b', label: 'Four' },
  { id: 55, categoryId: 'b', label: 'Four' },
  { id: 66, categoryId: 'b', label: 'Three' },
  { id: 77, categoryId: 'b', label: 'Four' },
  { id: 88, categoryId: 'b', label: 'Three' },
  { id: 99, categoryId: 'b', label: 'Four' },
  { id: 101, categoryId: 'b', label: 'Three' },
  { id: 111, categoryId: 'b', label: 'Four' },
  { id: 121, categoryId: 'b', label: 'Three' },
  { id: 131, categoryId: 'c', label: 'One' },
];

const categories = [
  { id: 'a', label: 'Category A' },
  { id: 'b', label: 'Category B' },
  { id: 'c', label: 'Category C' },
];

<Dropdown
  items={items}
  categories={categories}
  twoColumn={false}
  defaultSelectedItems={[items[2]]}
>
  {({ getInputProps }) => <InputText readOnly {...getInputProps()} />}
</Dropdown>;
```

#### Dropdown with multi-level item list (two columns).

```js
import { InputText } from '@quid/react-forms';

const items = [
  { id: 10, categoryId: 'a', label: 'One' },
  { id: 22, categoryId: 'a', label: 'Two' },
  { id: 33, categoryId: 'b', label: 'Three' },
  { id: 44, categoryId: 'b', label: 'Four' },
  { id: 55, categoryId: 'b', label: 'Four', disabled: true },
  { id: 66, categoryId: 'b', label: 'Three', disabled: true },
  { id: 77, categoryId: 'b', label: 'Four' },
  { id: 88, categoryId: 'b', label: 'Three' },
  { id: 99, categoryId: 'b', label: 'Four' },
  { id: 101, categoryId: 'b', label: 'Three' },
  { id: 111, categoryId: 'b', label: 'Four' },
  { id: 121, categoryId: 'b', label: 'Three' },
  { id: 131, categoryId: 'c', label: 'One' },
];

const categories = [
  { id: 'a', label: 'Category A' },
  { id: 'b', label: 'Category B' },
  { id: 'c', label: 'Category C' },
];

<Dropdown items={items} categories={categories}>
  {({ getInputProps }) => (
    <InputText readOnly placeholder="Select an item..." {...getInputProps()} />
  )}
</Dropdown>;
```

#### Dropdown with highlight and filter function.

```js
import { InputText } from '@quid/react-forms';

const items = [
  { id: 1, label: 'Alaska airlines' },
  { id: 2, label: 'Allegiant Air' },
  { id: 3, label: 'American Airlines' },
  { id: 4, label: 'Delta Air Lines' },
  { id: 5, label: 'Frontier Airlines' },
  { id: 6, label: 'Hawaiian Airlines' },
  { id: 7, label: 'JetBlue Airways' },
  { id: 8, label: 'Southwest Airlines' },
  { id: 9, label: 'Spirit Airlines' },
  { id: 10, label: 'Sun Country Airlines' },
  { id: 11, label: 'United Airlines' },
];
<Dropdown items={items} useFilter={true} highlight={true}>
  {({ getInputProps }) => (
    <InputText
      style={{ width: 300 }}
      placeholder="Type the word 'airlines' to see highlights..."
      {...getInputProps()}
    />
  )}
</Dropdown>;
```

#### Dropdown with custom render function:

```js
import { InputText } from '@quid/react-forms';

const ReactDOM = require('react-dom');

const items = [
  { id: 1, label: 'Alaska airlines' },
  { id: 2, label: 'Allegiant Air' },
  { id: 3, label: 'American Airlines' },
  { id: 4, label: 'Delta Air Lines' },
  { id: 5, label: 'Frontier Airlines' },
  { id: 6, label: 'Hawaiian Airlines' },
  { id: 7, label: 'JetBlue Airways' },
  { id: 8, label: 'Southwest Airlines' },
  { id: 9, label: 'Spirit Airlines' },
  { id: 10, label: 'Sun Country Airlines' },
  { id: 11, label: 'United Airlines' },
];
<Dropdown
  items={items}
  useFilter={true}
  highlight={true}
  renderDropdown={({ dropdown }) =>
    ReactDOM.createPortal(dropdown, document.querySelector('#rsg-root'))
  }
>
  {({ getInputProps }) => (
    <InputText
      style={{ width: 300 }}
      placeholder="Type the word 'airlines' to see highlights..."
      {...getInputProps()}
    />
  )}
</Dropdown>;
```

#### Dropdown with custom DropdownList style

Depending by your use case, you may want to override the dropdown styles, for instance, to increase its width.

This can be achieved by using [Emotion's "component as selector"](https://emotion.sh/docs/styled#targeting-another-emotion-component) feature:

```js static
import { Dropdown, DropdownList } from '@quid/react-dropdown';
import styled from '@emotion/styled/macro';

const CustomDropdown = styled(Dropdown)`
  ${DropdownList} {
    width: 300px;
  }
`;

const items = [{ id: 10, label: 'One' }, { id: 22, label: 'Two' }];

<CustomDropdown items={items}>
  {({ getInputProps }) => <InputText readOnly {...getInputProps()} />}
</CustomDropdown>;
```
