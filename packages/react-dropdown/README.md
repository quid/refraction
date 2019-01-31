A feature complete "dropdown" component built with React and Downshift.

It supports most of the possible use cases, included category grouping, two column layout, and more.

#### Installation

```bash
npm install --save @quid/react-dropdown

# or

yarn add @quid/react-dropdown
```

#### Usage

```jsx static
import Dropdown from '@quid/react-dropdown';

const items = [
  { id: 1, label: 'One' },
  { id: 2, label: 'Two' },
  { id: 3, label: 'Three' },
  { id: 4, label: 'Four' },
  { id: 5, label: 'Five' },
];

<Dropdown items={items} selectedItems={[items[0]]}>
  {({ getInputProps }) => <input readOnly {...getInputProps()} />}
</Dropdown>;
```
