InputDate example:

```js
const addDays = require('date-fns/add_days');
initialState = {
  value: new Date().toISOString().split('T')[0],
  isOpen: false,
};

const handleChange = value => console.log(value) || setState({ value });
const handleToggle = isOpen => setState({ isOpen });
<div style={{ position: 'relative', zIndex: 3 }}>
  <InputDate
    value={state.value}
    // eg. 2018-02-13
    min={
      addDays(new Date(), -5)
        .toISOString()
        .split('T')[0]
    }
    onChange={handleChange}
    onToggle={handleToggle}
    isOpen={state.isOpen}
  />
</div>;
```

Disabled InputDate example:

```js
initialState = {
  value: new Date().toISOString().split('T')[0],
  isOpen: false,
};

const handleChange = value => setState({ value });
const handleToggle = isOpen => setState({ isOpen });
<InputDate
  disabled
  value={state.value}
  onChange={handleChange}
  onToggle={handleToggle}
  isOpen={state.isOpen}
/>;
```
