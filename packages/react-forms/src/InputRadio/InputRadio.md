The `InputRadio` component provides an API compatible with the [`input[type=radio]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) HTML element.

```js
<form>
  <table className="DemoTable">
    <thead>
      <tr>
        <th />
        <th>Radios</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>On</td>
        <td>
          <InputRadio name="inputradiodemo" defaultChecked />
        </td>
      </tr>
      <tr>
        <td>Off</td>
        <td>
          <InputRadio name="inputradiodemo" />
        </td>
      </tr>
      <tr>
        <td>Disabled</td>
        <td>
          <InputRadio name="inputradiodemo" disabled />
        </td>
      </tr>
    </tbody>
  </table>
</form>
```
