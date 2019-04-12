`@quid/react-use-controlled-state` is a custom React Hook designed to
enable developers to easily create components able to work both as
[fully controlled][controlled-components] or [fully uncontrolled][uncontrolled-components]
without code repetition.

## Installation

```bash
npm install --save @quid/react-use-controlled-state

# or

yarn add @quid/react-use-controlled-state
```

## Usage example

Take this component as example:

```jsx static
import useControlledState from '@quid/react-use-controlled-state';

const MyComponent = ({ defaultOpen, open, onChange }) => {
  const [state, setState] = useControlledState(defaultOpen, open, onChange);

  return (
    <button type="button" onClick={() => setState(current => !current)}>
      {state === true ? 'component is open' : 'component is closed'}
    </button>
  );
};
```

Thanks to `@quid/react-use-controlled-state`, this component can be used in two
different ways now.

The first way let's you define a default open state, and let the component hold
and handle the state changes for you, transparently.

```jsx
import useControlledState from '@quid/react-use-controlled-state';

const MyComponent = ({ defaultOpen, open, onChange }) => {
  const [state, setState] = useControlledState(defaultOpen, open, onChange);

  return (
    <button type="button" onClick={() => setState(current => !current)}>
      {state === true ? 'component is open' : 'component is closed'}
    </button>
  );
};

<MyComponent defaultOpen={false} />;
```

The second way, makes you define a `open` property, along with an `onChange` callback.  
You will be responsible to update the state and maintain it externally.

```jsx
import useControlledState from '@quid/react-use-controlled-state';

const MyComponent = ({ defaultOpen, open, onChange }) => {
  const [state, setState] = useControlledState(defaultOpen, open, onChange);

  return (
    <button type="button" onClick={() => setState(current => !current)}>
      {state === true ? 'component is open' : 'component is closed'}
    </button>
  );
};

const App = () => {
  const [isOpen, setOpen] = React.useState(false);

  return <MyComponent open={isOpen} onChange={open => setOpen(open)} />;
};

<App />;
```

Both the approaches have their upsides and downsides, and it's useful to let your
users decide what fits better their needs.

<!-- NPM_ONLY> -->

---

More documentation is available at https://ui.quid.com

<!-- <NPM_ONLY -->

[controlled-components]: https://reactjs.org/docs/forms.html#controlled-components
[uncontrolled-components]: https://reactjs.org/docs/uncontrolled-components.html
