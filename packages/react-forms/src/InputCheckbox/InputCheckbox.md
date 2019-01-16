The `InputCheckbox` component provides an API compatible with the [`input[type=checkbox]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) HTML element.

```js
<form>
  <table className="DemoTable">
    <thead>
      <tr>
        <th />
        <th>Checkboxes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>On</td>
        <td>
          <InputCheckbox defaultChecked />
        </td>
      </tr>
      <tr>
        <td>Off</td>
        <td>
          <InputCheckbox />
        </td>
      </tr>
      <tr>
        <td>Disabled</td>
        <td>
          <InputCheckbox disabled />
        </td>
      </tr>
    </tbody>
  </table>
</form>
```
