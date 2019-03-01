#### Dropdown with single item list

This is the most basic use case, the dropdown will behave like a
normal HTML `select` element:

```js
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

<Dropdown items={items} initialSelectedItems={[items[3]]}>
  {({ getInputProps }) => <InputText readOnly {...getInputProps()} />}
</Dropdown>;
```

This is usecase will allow you to use `Dropdown` as a controlled component.

```js
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
  selectedItems={state.selectedItems}
  onChange={newSelectedItems => {
    setState({
      selectedItems: newSelectedItems,
    });
  }}
>
  {({ getInputProps }) => <InputText readOnly {...getInputProps()} />}
</Dropdown>;
```

#### Dropdown with multi-level item list (one column)

In this example, the items are grouped by category.

```jsx
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
  initialSelectedItems={[items[2]]}
>
  {({ getInputProps }) => <InputText readOnly {...getInputProps()} />}
</Dropdown>;
```

#### Dropdown with multi-level item list (two columns).

```js
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
