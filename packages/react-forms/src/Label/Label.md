The Label component allows to add an accompanying text to any form element.

By default, the label will render as a block element, taking the whole row:

```js
<>
  <Label htmlFor="one">Label</Label>
  <InputText id="one" />
</>
```

If the `inline` boolean property is provided, the element will render as an inline
element, which will make it lay near to any adjacent element:

```js
<>
  <Label inline htmlFor="two">
    Inline Label
  </Label>

  <InputText id="two" />
</>
```

If you desire to add a label to an existing form element without having to manually
add the needed spacings and alignments, you can pass a `renderControl` render-prop
to the Label component.

`renderControl` is a function that provides as unique argument a CSS class name that
contains the needed styling to properly space the form control and its label:

```js
<>
  <Label
    renderControl={controlClass => <InputToggle className={controlClass} />}
  >
    Wi-Fi
  </Label>
  <Label
    renderControl={controlClass => <InputToggle className={controlClass} />}
  >
    Bluetooth
  </Label>
</>
```

By default, the label will be right aligned, if you prefer it to stay on the left,
provide a `labelAlignment` property and set it to `left`:

```js
<Label
  renderControl={controlClass => <InputText className={controlClass} />}
  labelAlignment="left"
>
  Name
</Label>
```
