`merge-refs` is a little utility used to call different
React ["refs"][react-refs] all at once.

It can be especially useful if you are using two or more libraries
that need a reference of the same React component.

## Installation

```bash
npm install --save @quid/merge-refs

# or

yarn add @quid/merge-refs
```

## Usage

A typical use case is:

```jsx static
import mergeRefs from '@quid/merge-refs';

<Popper>
  {({ ref, style }) => (
    <MouseOutside>
      {ref2 => (
        <div style={style} ref={mergeRefs(ref, ref2)}>
          content
        </div>
      )}
    </MouseOutside>
  )}
</Popper>;
```

Or, with React hooks:

```jsx static
import mergeRefs from '@quid/merge-refs';

const ref1 = useRef(null);
const ref2 = useRef(null);

<div ref={mergeRefs(ref1, ref2)} />;
```

[react-refs]: https://reactjs.org/docs/refs-and-the-dom.html
