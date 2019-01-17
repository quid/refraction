```js
<form onSubmit={evt => evt.preventDefault()}>
  <InvalidHandler errorMessage="Custom error message here">
    {(getInputProps, isInvalid) => (
      <input
        type="email"
        required
        {...getInputProps({ onChange: () => console.log('changed') })}
        style={{
          backgroundColor: isInvalid ? 'red' : 'white',
        }}
      />
    )}
  </InvalidHandler>
  <button type="submit">Submit</button>
</form>
```

#### `GetInputProps<{ onChange: Event => void, onInvalid: Event => void }>`

Call `getInputProps` to get two custom event handlers needed by the
target input element to properly report its validity state.

If you'd like to provide your own `onChange` and/or `onInvalid` callbacks,
you can call `getInputProps` with an object containing one or both the
functions to merge them with the ones provided by this component.

```js static
const { onChange } = getInputProps({ onChange: () => console.log('foobar') });
// calling `onChange` will trigger the `InvalidHandler` logic AND your console.log
```

#### `isInvalid: boolean`

This argument will be `true` whenever the target input element has an invalid
value and the user tried to submit the form.

It wil reset to `false` after the user changes the value of the input element,
and set back to `true` if the user tries to submit the form again with invalid data.
