The `InputRange` component aims to provide an interface compatible with [`input[type=range]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range).

```js
<InputRange step={5} name="uncontrolled-with-step" onChange={console.log} />
```

All the properties supported by the HTML element are supported by `InputRange`, but,
additionally, this component supports two values at the same time.

The `onChange` handler in this case will return an object containing the properties
`start` and `end`, rather than a single number.

Rather than expecting a `value` property, this component expects a `values` one, which is an array of 1 or 2 numbers.
If only one number is provided, the component will render a single handle, when two are provided, the component will switch
to the two handles layout.

```js
<InputRange
  defaultValues={[10, 40]}
  name="uncontrolled-double"
  onChange={console.log}
/>
```

As with the HTML version, you can provide a `discrete` boolean property to display
some little ticks across the bar to show the valid and selectionable values.

```js
<InputRange
  step={5}
  defaultValues={[0]}
  name="uncontrolled-discrete"
  discrete
/>
```

This component can be used either as a [fully controlled][controlled-components]
or [fully uncontrolled][uncontrolled-components] component:

```js
initialState = {
  values: [0],
};

<InputRange
  values={state.values}
  name="controlled-single"
  onChange={values => setState({ values })}
  max={100}
/>;
```

[controlled-components]: https://reactjs.org/docs/forms.html#controlled-components
[uncontrolled-components]: https://reactjs.org/docs/uncontrolled-components.html
