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
