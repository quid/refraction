The `InputGroup` component takes N children elements and adjusts their
`border-radius` CSS property according to their order in the parent.

The first element will lose any eventual rigth `border-radius`, any element
in the middle will lose `border-radius` on both sides, and the last element
will lose `border-radius` on its left.

```js
import { InputText, Button } from '@quid/react-forms';

<InputGroup>
  <InputText placeholder="InputText" />
  <Button importance="secondary">Button</Button>
</InputGroup>;
```

The above method will automatically inject the `className`, if this behavior is
not desired, a render-prop can be passed, with the `className` as first argument.

```js
import { InputText, Button } from '@quid/react-forms';

<InputGroup>
  {className => <InputText className={className} placeholder="InputText" />}
  {className => (
    <Button importance="secondary" className={className}>
      Button
    </Button>
  )}
</InputGroup>;
```

The component supports HTML validation:

```js
import { InputText, Button } from '@quid/react-forms';

<form onSubmit={e => e.preventDefault()}>
  <InputGroup>
    <InputText type="email" required placeholder="InputText" />
    <Button type="submit" importance="secondary">
      Submit
    </Button>
  </InputGroup>
</form>;
```

You can combine any of the components exported by `@quid/react-forms`:

```js
import { InputNumber, Button } from '@quid/react-forms';

<InputGroup>
  <Button>Btn</Button>
  <InputNumber />
</InputGroup>;
```
