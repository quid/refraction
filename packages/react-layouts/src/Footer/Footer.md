Footer component example:

```js
import { Button } from '@quid/react-core';

<Footer style={{ marginBottom: 10 }}>
  <Footer.Slot left>
    {paddingClass => <Button className={paddingClass}>How Quid Works</Button>}
  </Footer.Slot>
  <Footer.Slot center separated>
    {paddingClass => (
      <>
        <Button className={paddingClass}>Preview Slides</Button>
        <Button className={paddingClass} importance="primary">
          Share
        </Button>
      </>
    )}
  </Footer.Slot>
  <Footer.Slot right>
    {paddingClass => (
      <Button className={paddingClass}>Export all to PPT</Button>
    )}
  </Footer.Slot>
</Footer>;
```

`Footer.Slot` component helps you to divide `Footer` into smaller pieces. It accepts `center`, `separated`, `left` and `right` props.
Use `paddingClass` argument to add extra padding to the first and last component inside `Footer.Slot`.

For transparent `Footer` use `transparent` prop.

```js
import { Button } from '@quid/react-core';

<Footer transparent style={{ marginBottom: 10 }}>
  <Footer.Slot left>
    {paddingClass => <Button className={paddingClass}>How Quid Works</Button>}
  </Footer.Slot>
  <Footer.Slot center separated>
    {paddingClass => (
      <>
        <Button className={paddingClass}>Preview Slides</Button>
        <Button className={paddingClass} importance="primary">
          Share
        </Button>
      </>
    )}
  </Footer.Slot>
  <Footer.Slot right>
    {paddingClass => (
      <Button className={paddingClass}>Export all to PPT</Button>
    )}
  </Footer.Slot>
</Footer>;
```
