Disabled for now, we need the PillList component to demo them.

### Dropdown with single item list and multiselect option.

```js
const items = [
  { id: 10, label: 'One' },
  { id: 22, label: 'Two' },
  { id: 33, label: 'Three' },
  { id: 44, label: 'Four' },
  { id: 55, label: 'Four' },
  { id: 66, label: 'Three', disabled: true },
  { id: 77, label: 'Four', disabled: true },
  { id: 88, label: 'Three' },
  { id: 99, label: 'Four' },
  { id: 101, label: 'Three' },
  { id: 111, label: 'Four' },
  { id: 121, label: 'Three' },
  { id: 131, label: 'One' },
];

initialState = {
  pills: [],
};

const mirrorDropdownState = inputStates => {
  setState({
    pills: inputStates,
  });
};

const handleDelete = ({ id }) => {
  setState(({ pills }) => ({
    pills: pills.filter(pill => id !== pill.id),
  }));
};

<Dropdown items={items} multiselect={true} onChange={mirrorDropdownState}>
  {({ getInputProps, removeItem, ...props }) => {
    return (
      <div>
        <PillList
          paginate
          firstPageItems={4}
          restPageItems={2}
          pills={state.pills}
          onDelete={item => {
            removeItem(item);
            handleDelete(item);
          }}
        />
        <InputText readOnly {...getInputProps()} />
      </div>
    );
  }}
</Dropdown>;
```

### Dropdown with multi-level item list (two columns) and multiselect.

```js
const items = [
  { id: 10, categoryId: 'a', label: 'One' },
  { id: 22, categoryId: 'a', label: 'Two', disabled: true },
  { id: 33, categoryId: 'b', label: 'Three' },
  { id: 44, categoryId: 'b', label: 'Four' },
  { id: 55, categoryId: 'b', label: 'Four' },
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

const selectedItems = [items[3], items[12]];

initialState = {
  pills: selectedItems,
};

const mirrorDropdownState = inputStates => {
  setState({
    pills: inputStates,
  });
};

const handleDelete = ({ id }) => {
  setState(({ pills }) => ({
    pills: pills.filter(pill => id !== pill.id),
  }));
};

<Dropdown
  items={items}
  categories={categories}
  multiselect={true}
  defaultSelectedItems={selectedItems}
  onChange={mirrorDropdownState}
>
  {({ getInputProps, removeItem, ...props }) => {
    return (
      <div>
        <PillList
          paginate
          firstPageItems={4}
          restPageItems={2}
          pills={state.pills}
          onDelete={item => {
            removeItem(item);
            handleDelete(item);
          }}
        />
        <InputText readOnly {...getInputProps()} />
      </div>
    );
  }}
</Dropdown>;
```
