`react-mouse-outside` enables to listen for mouse events that happen
to the target reference elements.

#### Installation

```bash
npm install --save @quid/react-mouse-outside

# or

yarn add @quid/react-mouse-outside
```

#### Usage

```jsx
const MouseOutside = require('./src').default;

initialState = { txt: 'click outside' };
const callback = () =>
  setState({ txt: 'clicked!' }, () =>
    setTimeout(() => setState({ txt: 'click outside' }), 300)
  );

<MouseOutside onClickOutside={callback}>
  {getRef => <div ref={getRef}>{state.txt}</div>}
</MouseOutside>;
```

The component accepts 3 properties, included `children`:

##### `onClickOutside: Event => void`

A function that will take as first argument the event object
and gets triggered anytime the user clicks outside.

##### `onMoveOutside: Event => void`

A function that will take as first argument the event object
and gets triggered anytime the user moves the mouse outside.

##### `children: React.ElementRef => void`

It takes as `children` a function with a `React.createRef` function
as only argument. You can assign it as `ref` to any React element.

#### Migration from @quid/react-components#MouseOutside

The component takes as child a render-prop rather than a React element.
This allows for more flexibility and removes the requirement of an extra wrapper.
