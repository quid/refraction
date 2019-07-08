**RenderTooltipProps** type definition:

| Prop name   | Type                          | Default | Description |
| ----------- | ----------------------------- | ------- | ----------- |
| `ref`       | `React.ElementRef<any>`       |         |             |
| `style`     | `$Shape<CSSStyleDeclaration>` |         |             |
| `placement` | `Popper.js#Placement`         |         |             |
| `toggle`    | `() => void`                  |         |             |

### Uncontrolled component

The most basic usage example of the Tooltip component can be achieved by
providing as `Tooltip` `children` a render-prop function providing a
`ref` and `toggle` properties, and a `renderTooltip` property, providing
a set of properties described in the table above.

In this case, the component state will be handled internally by the
component itself, you may decide to provide an `onToggle` property to
read the value when it changes, but you are not allowed define the current
state in a declarative way.

```jsx
import { Button } from '@quid/react-core';
import { Tooltip, Container } from '.'; // @quid/react-tooltip

<Tooltip
  renderTooltip={props => <Container {...props}>Tooltip content</Container>}
>
  {({ ref, toggle, open }) => (
    <Button type="button" onClick={toggle} onMouseEnter={open} ref={ref}>
      Reference element
    </Button>
  )}
</Tooltip>;
```

### Controlled component

If you'd rather control the component state declaratively, you can provide
an `open` property, which can be set to either `true` or `false`, and an
`onToggle` property, you will need to use to update the `open` property when
a state change is triggered.

```jsx
import { Button } from '@quid/react-core';
import { Tooltip, Container } from '.'; // @quid/react-tooltip

initialState = { open: false };

<Tooltip
  open={state.open}
  onToggle={open => setState({ open })}
  placement="right"
  renderTooltip={props => <Container {...props}>Tooltip content</Container>}
  openDelay={300}
  closeDelay={500}
>
  {({ ref, toggle, open }) => (
    <Button type="button" onClick={toggle} onMouseEnter={open} ref={ref}>
      Reference element
    </Button>
  )}
</Tooltip>;
```
