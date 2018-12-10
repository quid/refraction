The `Button` component is used to let the user perform an action
once it's clicked:

```js
<Button importance="primary">I'm a button</Button>
```

These are all the supported style variations:

```js
<table className="DemoTable">
  <thead>
    <tr>
      <th />
      <th>Default</th>
      <th>Disabled</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Primary</td>
      <td>
        <Button importance="primary">Button</Button>
      </td>
      <td>
        <Button importance="primary" disabled>
          Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Primary Small</td>
      <td>
        <Button importance="primary" size="small">
          Button
        </Button>
      </td>
      <td>
        <Button importance="primary" size="small" disabled>
          Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Primary with Icon</td>
      <td>
        <Button importance="primary">
          <x-icon name="scatter" />
        </Button>
      </td>
      <td>
        <Button importance="primary" disabled>
          <x-icon name="scatter" />
        </Button>
      </td>
    </tr>
    <tr>
      <td>Primary Small with Icon</td>
      <td>
        <Button importance="primary" size="small">
          <x-icon name="scatter" />
        </Button>
      </td>
      <td>
        <Button importance="primary" size="small" disabled>
          <x-icon name="scatter" />
        </Button>
      </td>
    </tr>
    <tr>
      <td>Primary with both</td>
      <td>
        <Button importance="primary">
          <x-icon name="download" /> Button
        </Button>
      </td>
      <td>
        <Button importance="primary" disabled>
          <x-icon name="download" /> Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Primary Small with both</td>
      <td>
        <Button importance="primary" size="small">
          <x-icon name="download" /> Button
        </Button>
      </td>
      <td>
        <Button importance="primary" size="small" disabled>
          <x-icon name="download" /> Button
        </Button>
      </td>
    </tr>
    <tr>
      <td colSpan="3">
        <hr />
      </td>
    </tr>
    <tr>
      <td>Secondary</td>
      <td>
        <Button importance="secondary">Button</Button>
      </td>
      <td>
        <Button importance="secondary" disabled>
          Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Secondary Small</td>
      <td>
        <Button importance="secondary" size="small">
          Button
        </Button>
      </td>
      <td>
        <Button importance="secondary" size="small" disabled>
          Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Secondary with Icon</td>
      <td>
        <Button importance="secondary">
          <x-icon name="scatter" />
        </Button>
      </td>
      <td>
        <Button importance="secondary" disabled>
          <x-icon name="scatter" />
        </Button>
      </td>
    </tr>
    <tr>
      <td>Secondary Small with Icon</td>
      <td>
        <Button importance="secondary" size="small">
          <x-icon name="scatter" />
        </Button>
      </td>
      <td>
        <Button importance="secondary" size="small" disabled>
          <x-icon name="scatter" />
        </Button>
      </td>
    </tr>
    <tr>
      <td>Secondary with both</td>
      <td>
        <Button importance="secondary">
          <x-icon name="download" /> Button
        </Button>
      </td>
      <td>
        <Button importance="secondary" disabled>
          <x-icon name="download" /> Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Secondary Small with both</td>
      <td>
        <Button importance="secondary" size="small">
          <x-icon name="download" /> Button
        </Button>
      </td>
      <td>
        <Button importance="secondary" size="small" disabled>
          <x-icon name="download" /> Button
        </Button>
      </td>
    </tr>
    <tr>
      <td colSpan="3">
        <hr />
      </td>
    </tr>
    <tr>
      <td>Okay</td>
      <td>
        <Button importance="okay">Button</Button>
      </td>
      <td>
        <Button importance="okay" disabled>
          Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Warning</td>
      <td>
        <Button importance="warning">Button</Button>
      </td>
      <td>
        <Button importance="warning" disabled>
          Button
        </Button>
      </td>
    </tr>
    <tr>
      <td>Hazard</td>
      <td>
        <Button importance="hazard">Button</Button>
      </td>
      <td>
        <Button importance="hazard" disabled>
          Button
        </Button>
      </td>
    </tr>
  </tbody>
</table>
```
