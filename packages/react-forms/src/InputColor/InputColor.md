The `InputColor` component shares the same API of the HTML `input[type=color]` element.

```js
<InputColor onChange={e => console.log(e.target.value)} />
```

It also supports all the `InputText` and `Button` properties:

```js
<InputColor size="small" defaultValue="#FFF000" importance="primary" />
```

The component supports both uncontrolled and controlled API styles:

```js
initialState = { value: '#00FF00' };
<InputColor
  size="large"
  value={state.value}
  onChange={evt => setState({ value: evt.target.value })}
/>;
```
