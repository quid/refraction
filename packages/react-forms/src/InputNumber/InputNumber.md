The `InputNumber` component provides the same API of the HTML `<input type="number" />`,
with the addition of some useful features.

Default:

```js
<InputNumber min={-5} defaultValue={15} step={2} />
```

With optional unit (specified with the `unit` property):

```js
<InputNumber unit="pt" defaultValue={15} />
```

Disabled:

```js
<InputNumber defaultValue={15} disabled />
```

Read Only:

```js
<InputNumber defaultValue={15} readOnly />
```
