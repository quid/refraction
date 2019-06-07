**RenderPopoverProps** type definition:

| Prop name    | Type                            | Default | Description |
| ------------ | ------------------------------- | ------- | ----------- |
| `ref`        | `React.ElementRef<any>`         |         |             |
| `style`      | `$Shape<CSSStyleDeclaration>`   |         |             |
| `placement`  | `Popper.js#Placement`           |         |             |
| `arrowProps` | `react-popper#PopperArrowProps` |         |             |
| `toggle`     | `() => void`                    |         |             |

### Uncontrolled component

The most basic usage example of the Popover component can be achieved by
providing as `Popover` `children` a render-prop function providing a
`ref` and `toggle` properties, and a `renderPopover` property, providing
a set of properties described in the table above.

In this case, the component state will be handled internally by the
component itself, you may decide to provide an `onToggle` property to
read the value when it changes, but you are not allowed define the current
state in a declarative way.

```jsx
import { Button } from '@quid/react-core';
import Popover, { Container, Arrow } from '.'; // @quid/react-popover

<Popover
  renderPopover={props => (
    <Container {...props}>
      Popover content
      <Arrow ref={props.arrowProps.ref} />
    </Container>
  )}
>
  {({ ref, toggle, onMouseEnter }) => (
    <Button type="button" onClick={toggle} ref={ref}>
      Reference element
    </Button>
  )}
</Popover>;
```

### Controlled component

If you'd rather control the component state declaratively, you can provide
an `open` property, which can be set to either `true` or `false`, and an
`onToggle` property, you will need to use to update the `open` property when
a state change is triggered.

```jsx
import { Button } from '@quid/react-core';
import Popover, { Container, Arrow } from '.'; // @quid/react-popover

initialState = { open: false };

<Popover
  open={state.open}
  onToggle={open => setState({ open })}
  placement="right"
  renderPopover={props => (
    <Container {...props}>
      Popover content
      <Arrow ref={props.arrowProps.ref} />
    </Container>
  )}
>
  {({ ref, toggle }) => (
    <Button type="button" onClick={toggle} ref={ref}>
      Reference element
    </Button>
  )}
</Popover>;
```
