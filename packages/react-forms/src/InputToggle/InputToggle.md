The `InputToggle` component provides a "checkbox like" element, that looks like
a physical "switch" or "toggle".

Its' API is identical to the one of the HTML [`input[type=checkbox]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox).

```js
<form>
  <table className="DemoTable">
    <thead>
      <tr>
        <th />
        <th>Toggles</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>On</td>
        <td>
          <InputToggle defaultChecked />
        </td>
      </tr>
      <tr>
        <td>Off</td>
        <td>
          <InputToggle />
        </td>
      </tr>
      <tr>
        <td>Disabled</td>
        <td>
          <InputToggle disabled />
        </td>
      </tr>
    </tbody>
  </table>
</form>
```
