The `InputRange` component aims to provide an interface compatible with [`input[type=range]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range).

```js
<InputRange step={5} name="single1" onChange={console.log} />
```

All the properties supported by the HTML element are supported by `InputRange`, but,
additionally, this component supports two values at the same time.

The `onChange` handler in this case will return an object containing the properties
`start` and `end`, rather than a single number.

Note that in order to switch the component behavior to the double valued alternative
you must define a `defaultValue` defining the `start` and `end` properties, or define
its `value`.

```js
<InputRange
  defaultValue={{ start: 10, end: 40 }}
  name="double1"
  onChange={console.log}
/>
```

As with the HTML version, you can provide a `discrete` boolean property to display
some little ticks across the bar to show the valid and selectionable values.

```js
<InputRange step={5} defaultValue={0} name="single2" discrete />
```
