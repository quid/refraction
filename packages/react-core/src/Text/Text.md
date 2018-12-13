The `Text` component is a little utility that makes it easy
to style any text with any of the supported text styles provided
by [`@quid/theme#textStyles`](#theme).

```
<Text type="large bold">Large bold text here</Text>
```

```
// The bold style is inherited by the default H1 styles of this web page
<Text as="h1" type="normal">Normal text with H1 tag</Text>
```

This component provides a complementary skeleton, it can be used as placeholder
while the actual content is still loading, the following examples are rendering
the same content of the two above, but with the skeleton component:

```
<Text.Skeleton type="large bold">Large bold text here</Text.Skeleton>
```

```
<Text.Skeleton as="h1" type="normal">Normal text with H1 tag</Text.Skeleton>
```

Alternatively, you can provide a fixed width to an empty skeleton:

```
<Text.Skeleton type="normal" width="15em" />
```

#### Migration from @quid/react-components#Text

If you were a user of the previous component, there are a few breaking changes:

1. Text.H1, H2, P, etc... are not supported anymore, use the `as` property instead;
2. The skeleton component now takes the same amount of space of the Text base component;
3. The skeleton component will render sensibly differently, take extra attention during migration;
