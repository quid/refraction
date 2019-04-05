The `TextArea` component acts exactly like a `textarea` HTML element,
and shares all the features provided by the `InputText` component.

```js
<TextArea
  placeholder="This is a textarea, multiline text is supported"
  style={{ height: 100 }}
/>
```

Along with all the `InputText` features, there's the HTML form validation:

```js
import { Button } from '@quid/react-core';

<form onSubmit={e => e.preventDefault()}>
  <TextArea style={{ height: 100 }} required placeholder="This is required" />
  <br />
  <br />
  <Button type="submit">Submit</Button>
</form>;
```
