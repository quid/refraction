This [Stylis][stylis] plugin is a polyfill for the [`:focus-visible`][focus-visible] CSS pseudo-class.

It works in conjuction with [`what-input`][what-input] to provide a reliable behavior on browsers
that don't natively support the `:focus-visible` pseudo-class.

Example input:

```css
.foo:focus-visible {
  color: red;
}
```

Example output:

```css
[data-whatinput='keyboard'] .foo:focus,
[data-whatinput='initial'] .foo:focus {
  color: red;
}
```

## Installation

```bash
npm install --save @quid/stylis-plugin-focus-visible

# or

yarn add @quid/stylis-plugin-focus-visible
```

## Usage with Emotion

Is it suggested to use this plugin with [Emotion][emotion]'s `CacheProvider`:

```jsx static
import 'what-input';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import focusVisiblePlugin from '@quid/stylis-plugin-focus-visible';

const emotionCache = createCache({
  stylisPlugins: [focusVisiblePlugin],
});

const App = () => (
  <CacheProvider value={emotionCache}>
    <StyledComponent>
      any children will be able to use `:focus-visible`
    </StyledComponent>
  </CacheProvider>
);
```

Beware, the cache instance should be shared across the app if multiple `CacheProvider`
components are used. If you define a new cache, Emotion will parse all your styles twice.

<!-- NPM_ONLY> -->

More documentation is available at https://ui.quid.com

<!-- <NPM_ONLY -->

[stylis]: https://github.com/thysultan/stylis.js
[focus-visible]: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
[what-input]: https://github.com/ten1seven/what-input
[emotion]: https://emotion.sh
