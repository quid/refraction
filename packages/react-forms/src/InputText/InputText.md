The `InputText` component is the base unit used to create most of the more
advanced input components.

It reproduces all the functionalities of a standard HTML `<input />` element,
with some useful additions.

```js
<form>
  <table className="DemoTable">
    <thead>
      <tr>
        <th />
        <th>Default</th>
        <th>Typed Text</th>
        <th>Disabled</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>No Label</td>
        <td>
          <InputText />
        </td>
        <td>
          <InputText defaultValue="Typed something" />
        </td>
        <td>
          <InputText disabled />
        </td>
      </tr>
      <tr>
        <td>With Placeholder</td>
        <td>
          <InputText placeholder="I'm a Label" />
        </td>
        <td>
          <InputText placeholder="I'm a Label" defaultValue="Typed something" />
        </td>
        <td>
          <InputText placeholder="I'm a Label" disabled />
        </td>
      </tr>
      <tr>
        <td>Large</td>
        <td>
          <InputText size="large" placeholder="I'm a Label" />
        </td>
        <td>
          <InputText
            size="large"
            placeholder="I'm a Label"
            defaultValue="Typed something"
          />
        </td>
        <td>
          <InputText size="large" placeholder="I'm a Label" disabled />
        </td>
      </tr>
      <tr>
        <td>Small</td>
        <td>
          <InputText size="small" placeholder="I'm a Label" />
        </td>
        <td>
          <InputText
            size="small"
            placeholder="I'm a Label"
            defaultValue="Typed something"
          />
        </td>
        <td>
          <InputText size="small" placeholder="I'm a Label" disabled />
        </td>
      </tr>
      <tr>
        <td>With addon</td>
        <td>
          <InputText
            placeholder="I'm a Label"
            renderAddon={({ onClick, marginRightClass }) => (
              <Icon
                className={marginRightClass}
                name="calendar"
                onClick={onClick}
              />
            )}
          />
        </td>
        <td>
          <InputText
            placeholder="I'm a Label"
            defaultValue="Typed something"
            renderAddon={({ onClick, marginRightClass }) => (
              <Icon
                className={marginRightClass}
                name="calendar"
                onClick={onClick}
              />
            )}
          />
        </td>
        <td>
          <InputText
            placeholder="I'm a Label"
            disabled
            renderAddon={({ onClick, marginRightClass }) => (
              <Icon
                className={marginRightClass}
                name="calendar"
                onClick={onClick}
              />
            )}
          />
        </td>
      </tr>
    </tbody>
  </table>
</form>
```

#### HTML form validation

The `InputText` component supports HTML form validation, with some improvements.  
The **invalid** state will not be visible until the `InputText`'s parent form is
submitted, this improves the user experience, since the user will only see validation
errors after they attempt to submit the form rather than while they are writing.

Additionally, it is possible to provide a `validationErrorMessage` property to
define a custom error message to display when the field is marked as invalid.

```js
<form onSubmit={evt => evt.preventDefault()}>
  <InputText
    required
    style={{ width: 400 }}
    placeholder="Press enter to trigger validation, write something to reset"
    validationErrorMessage="This is a custom error message"
  />
</form>
```

#### Addon

Is it possible to add an arbitrary element on the right of the `InputText` typing area
by providing a `renderAddon` property.

The property expects a function that takes as arguments an object containing an `onClick`
proprty. This property should be assigned to the addon element to make sure the
text fields get focused when its addon is clicked.

```js
<InputText
  renderAddon={({ onClick, marginRightClass }) => (
    <Icon className={marginRightClass} name="caret_down" onClick={onClick} />
  )}
/>
```
