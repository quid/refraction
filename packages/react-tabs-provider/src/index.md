This first example showcases the "stateful" or "uncontrolled" usage.

We just have to define an optional `defaultActive` property to specify
which tab we want to select by default, and then all the state management
will be handled by the component automatically.

```js
const { Tabs, TabList, TabPanel } = require('.');

<Tabs defaultActive="b">
  {({ active }) => (
    <>
      <TabList>
        {({ select, active }) => (
          <>
            <Button
              onClick={() => select('a')}
              importance={active === 'a' ? 'primary' : 'secondary'}
            >
              Tab A
            </Button>{' '}
            <Button
              onClick={() => select('b')}
              importance={active === 'b' ? 'primary' : 'secondary'}
            >
              Tab B
            </Button>{' '}
            <Button
              onClick={() => select('c')}
              importance={active === 'c' ? 'primary' : 'secondary'}
            >
              Tab C
            </Button>
          </>
        )}
      </TabList>
      <div>
        <TabPanel name="a">
          {({ name }) => `Content of tab ${name.toUpperCase()}`}
        </TabPanel>
        <TabPanel name="b">
          {({ name }) => `Content of tab ${name.toUpperCase()}`}
        </TabPanel>
        <TabPanel name="c">
          {({ name }) => `Content of tab ${name.toUpperCase()}`}
        </TabPanel>
      </div>
    </>
  )}
</Tabs>;
```

Example of fully controlled usage, in this case, the state of the component
is controlled by the properties we provide it.

Specifically, we want to provide the `active` property, which defines the
currently active tab, and the `onSelect` callback that gets called anytime
the user changes tab.

```js
initialState = { active: 'b' };
const { Tabs, TabList, TabPanel } = require('.');
<>
  <Button onClick={() => setState({ active: 'a' })}>Reset to A</Button>

  <hr />

  <Tabs active={state.active} onSelect={active => setState({ active })}>
    {({ active }) => (
      <>
        <TabList>
          {({ select, active }) => (
            <React.Fragment>
              <Button
                onClick={() => select('a')}
                importance={active === 'a' ? 'primary' : 'secondary'}
              >
                Tab A
              </Button>{' '}
              <Button
                onClick={() => select('b')}
                importance={active === 'b' ? 'primary' : 'secondary'}
              >
                Tab B
              </Button>{' '}
              <Button
                onClick={() => select('c')}
                importance={active === 'c' ? 'primary' : 'secondary'}
              >
                Tab C
              </Button>
            </React.Fragment>
          )}
        </TabList>
        <div>
          <TabPanel name="a">
            {({ name }) => `Content of tab ${name.toUpperCase()}`}
          </TabPanel>
          <TabPanel name="b">
            {({ name }) => `Content of tab ${name.toUpperCase()}`}
          </TabPanel>
          <TabPanel name="c">
            {({ name }) => `Content of tab ${name.toUpperCase()}`}
          </TabPanel>
        </div>
      </>
    )}
  </Tabs>
</>;
```
