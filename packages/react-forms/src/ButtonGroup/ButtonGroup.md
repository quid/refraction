The `ButtonGroup` component is designed to group two or more buttons into
a visually cohesive widget.

Simple `ButtonGroup` example, without selectable (or activable) buttons:

```js
import { Button } from '@quid/react-forms';

<ButtonGroup>
  <Button>Option 1</Button>
  <Button>Option 2</Button>
  <Button>Option 3</Button>
</ButtonGroup>;
```

The following example, instead, tracks the clicked button, this can be used
as a "radio selector" like component.

To mark a button as selected, simply assign it, as `className`,
the `activeClass` string provided by the `children` render-prop:

```js
import { Button } from '@quid/react-forms';

const buttons = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

initialState = { activeId: buttons[0].id };

<ButtonGroup>
  {({ selectedButtonClass }) =>
    buttons.map(({ id, label }) => (
      <Button
        className={state.activeId === id && selectedButtonClass}
        onClick={() => setState({ activeId: id })}
        key={id}
      >
        {label}
      </Button>
    ))
  }
</ButtonGroup>;
```

Here we represent the example above, but this time we'll provide
to `ButtonGroup` the property `disabled`, this will disable all
the buttons inside the component:

```js
import { Button } from '@quid/react-forms';

const buttons = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
];

initialState = { activeId: buttons[0].id };

<ButtonGroup disabled>
  {({ selectedButtonClass }) =>
    buttons.map(({ id, label }) => (
      <Button
        className={state.activeId === id && selectedButtonClass}
        onClick={() => setState({ activeId: id })}
        key={id}
      >
        {label}
      </Button>
    ))
  }
</ButtonGroup>;
```

Example of `ButtonGroup` working with a custom button component:

```js
import { Button } from '@quid/react-forms';

const MyButton = props => <button style={{ color: 'red' }} {...props} />;

<ButtonGroup>
  {({ buttonClass }) => (
    <>
      <MyButton className={buttonClass}>Option 1</MyButton>
      <MyButton className={buttonClass}>Option 2</MyButton>
      <MyButton className={buttonClass}>Option 3</MyButton>
    </>
  )}
</ButtonGroup>;
```
