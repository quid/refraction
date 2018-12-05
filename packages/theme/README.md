This package provides a set of colors, sizes, and font styles, used to style
the applications created at Quid.

The default export of the package is an Emotion [theme provider][theme-provider]
that should wrap any application to make sure the other Quid components
are properly styled with the resources provided by this package.

Additionally, you can import the `colors`, `sizes`, `textStyles`, and `themes`
named exports to directly reference the variables.

### Usage

Wrap your component with `ThemeProvider` and, optionally, define the desired
theme (`light` or `dark`, `light` is default):

```jsx static
import ThemeProvider from '@quid/theme';

<ThemeProvider theme="light">
  <Button>I'll use the light theme</Button>
</ThemeProvider>
```

### `withFallback`

The `withFallback` function is available to make it possible to create
your components and not have to worry of the case when no ThemeProvider
is defined to provide a theme to your component.

It will take care to set the light theme as default theme if no one is set.

```jsx static
import styled from '@emotion/styled';
import { withFallback as wf } from '@quid/theme';

const Button = styled.button`
  /* primary will always be defined no metter what */
  color: ${wf(props => props.theme.primary)};
`;
```

### `textStyles`

This utility will provide a set of CSS-in-JS compatible rules
to style a text according to the Quid UI guidelines.

The available styles are:

- `xlarge`, `large`, `normal` (text sizes)
- `title`, `body` (text sizes with serif font family)
- `bold`, `regular` (font weight)
- `secondary`, `disabled`, `link`, `highlighted` (text color)

```jsx static
import styled from '@emotion/styled';
import { textStyles } from '@quid/theme';

// This paragraph will have bold text, with the secondary text color
const Paragraph = styled.p`
  ${textStyles('bold', 'secondary')};
`;
```

[theme-provider]: https://emotion.sh/docs/emotion-theming
