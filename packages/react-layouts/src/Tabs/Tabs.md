`Tabs` organize content across different screens, data sets, and other interactions.

```js
import { Button, Icon } from '@quid/react-core';

initialState = {
  activeTab: 'two',
};

<Tabs
  id="tab_a"
  activeTab={state.activeTab}
  onChange={activeTab => setState({ activeTab })}
  sideTabsContent={
    <Button>
      <Icon name="expand" />
    </Button>
  }
>
  <Tabs.TabPanel label="One" name="one">
    Tabs content example 1. <br /> <br /> Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Proin vestibulum ipsum ut rhoncus tincidunt.
    Etiam lacinia nunc sit amet imperdiet tempus. Donec dapibus magna quis enim
    tincidunt, vel ultrices massa viverra. Vestibulum ante ipsum primis in
    faucibus orci luctus et ultrices posuere cubilia Curae; Integer ac arcu quis
    risus mollis placerat. Suspendisse nec fermentum lacus. Ut eleifend tempus
    tellus, ut malesuada odio sagittis in. Cras id pretium velit. Suspendisse
    fringilla leo a massa efficitur, vel aliquet metus gravida.
  </Tabs.TabPanel>
  <Tabs.TabPanel label="Two" name="two">
    Tabs content example 2. <br /> <br /> Vestibulum sollicitudin ligula nec
    lectus sagittis, a luctus nisl rutrum. Duis vitae eros nunc. Aliquam sed
    varius arcu. Vestibulum scelerisque rutrum accumsan. Proin nec metus non
    massa venenatis viverra eu eget odio. Maecenas eget vehicula velit.
    Pellentesque ornare non libero id venenatis. Nunc tortor neque, bibendum
    vitae turpis vel, porta faucibus ligula. Integer risus nulla, ornare ut
    lorem sed, semper gravida dui. Fusce a arcu at erat consequat pretium quis a
    mauris.
  </Tabs.TabPanel>
  <Tabs.TabPanel label="Three" name="three">
    Tabs content example 3. <br /> <br /> Vivamus pretium metus orci, et
    tristique est congue eu. Sed condimentum enim pharetra sagittis vestibulum.
    Maecenas in quam nec metus ultricies porttitor at in purus. Aenean at
    porttitor sapien. Nunc ac egestas odio. Class aptent taciti sociosqu ad
    litora torquent per conubia nostra, per inceptos himenaeos. Aenean tincidunt
    facilisis venenatis. Aliquam erat volutpat. Nam pretium et erat eget
    dapibus. Morbi facilisis augue eu nisi venenatis, egestas ultricies justo
    fringilla. Donec facilisis ipsum urna, nec tincidunt ante consequat non.
  </Tabs.TabPanel>
</Tabs>;
```
